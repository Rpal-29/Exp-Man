import { z } from "zod";
import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { createId } from "@paralleldrive/cuid2";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { and, desc, eq, gte, inArray, lte, sql } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { budgets, insertBudgetSchema, categories, accounts } from "@/db/schema";
import { parse, subDays } from "date-fns";

// Removed unused imports: error from console, Goal from lucide-react

const app = new Hono()
  .get(
    "/",
    zValidator("query", z.object({
      from: z.string().optional(),
      to: z.string().optional(),
      accountId: z.string().optional(),
    })),
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);
      const { from, to, accountId } = c.req.valid("query");
      console.log("Query params:", { from, to, accountId });
      console.log("Auth:", auth);

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const defaultTo = new Date();
      const defaultFrom = subDays(defaultTo, 30);
      const startDate = from && from !== "" ? parse(from, "yyyy-MM-dd", new Date()) : defaultFrom;
      const endDate = to && to !== "" ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

      const data = await db
        .select({
          id: budgets.id,
          date: budgets.date,
          category: categories.name,
          categoryId: budgets.categoryId,
          Goal: budgets.Goal,
          amount: budgets.amount,
          account: accounts.name,
          accountId: budgets.accountId,
        })
        .from(budgets)
        .innerJoin(accounts, eq(budgets.accountId, accounts.id))
        .leftJoin(categories, eq(budgets.categoryId, categories.id))
        .where(
          and(
            accountId ? eq(budgets.accountId, accountId) : undefined,
            eq(accounts.userId, auth.userId),
            gte(budgets.date, startDate),
            lte(budgets.date, endDate),
          )
        )
        .orderBy(desc(budgets.date));

      return c.json({ data });
    })
  .get(
    "/:id",
    zValidator("param", z.object({
      id: z.string().optional(),
    })),
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .select({
          id: budgets.id,
          date: budgets.date,
          categoryId: budgets.categoryId,
          Goal: budgets.Goal,
          amount: budgets.amount,
          account: accounts.name,
          accountId: budgets.accountId,
        })
        .from(budgets)
        .innerJoin(accounts, eq(budgets.accountId, accounts.id))
        .where(
          and(
            eq(accounts.userId, auth.userId),
            eq(budgets.id, id),
          )
        );

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator("json", insertBudgetSchema.omit({
      id: true,
    })),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db.insert(budgets).values({
        id: createId(),
        ...values,
        Goal: values.Goal, // Explicitly include Goal
      }).returning();

      return c.json({ data });
    })
  .post(
    "/bulk-create",
    clerkMiddleware(),
    zValidator(
      "json",
      z.array(
        insertBudgetSchema.omit({
          id: true,
        }),
      ),
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .insert(budgets)
        .values(
          values.map((value) => ({
            id: createId(),
            ...value,
            Goal: value.Goal, // Explicitly include Goal
          }))
        )
        .returning();

      return c.json({ data })
    },
  )
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      }),
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const budgetsToDelete = db.$with("budgets_to_delete").as(
        db.select({ id: budgets.id }).from(budgets)
          .innerJoin(accounts, eq(budgets.accountId, accounts.id))
          .where(and(
            inArray(budgets.id, values.ids),
            eq(accounts.userId, auth.userId),
          )),
      );

      const data = await db
        .with(budgetsToDelete)
        .delete(budgets)
        .where(
          inArray(budgets.id, sql`(select id from ${budgetsToDelete})`)
        )
        .returning({
          id: budgets.id,
        });

      return c.json({ data });
    },
  )
  .patch(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      }),
    ),
    zValidator(
      "json",
      insertBudgetSchema.omit({
        id: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }
      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401)
      }

      const budgetsToUpdate = db.$with("budgets_to_update").as(
        db.select({ id: budgets.id })
          .from(budgets)
          .innerJoin(accounts, eq(budgets.accountId, accounts.id))
          .where(and(
            eq(budgets.id, id),
            eq(accounts.userId, auth.userId),
          )),
      );

      const [data] = await db
        .with(budgetsToUpdate)
        .update(budgets)
        .set({
          ...values,
          Goal: values.Goal, // Explicitly include Goal
        })
        .where(
            inArray(budgets.id, sql`(select id from ${budgetsToUpdate})`)
          )
          .returning();
  
        if (!data) {
          return c.json({ error: "Not found" }, 404);
        }
        return c.json({ data });
      },
    )
    .delete(
      "/:id",
      clerkMiddleware(),
      zValidator(
        "param",
        z.object({
          id: z.string().optional(),
        }),
      ),
      async (c) => {
        const auth = getAuth(c);
        const { id } = c.req.valid("param");
  
        if (!id) {
          return c.json({ error: "Missing id" }, 400);
        }
        if (!auth?.userId) {
          return c.json({ error: "Unauthorized" }, 401)
        }
  
        const budgetsToDelete = db.$with("budgets_to_delete").as(
          db.select({ id: budgets.id }).from(budgets)
            .innerJoin(accounts, eq(budgets.accountId, accounts.id))
            .where(and(
              eq(budgets.id, id),
              eq(accounts.userId, auth.userId),
            )),
        );
  
        const [data] = await db
          .with(budgetsToDelete)
          .delete(budgets)
          .where(
            inArray(
              budgets.id,
              sql`(select id from ${budgetsToDelete})`
            ),
          )
          .returning({
            id: budgets.id,
          });
  
        if (!data) {
          return c.json({ error: "Not found" }, 404);
        }
        return c.json({ data });
      },
    )
  
  export default app;