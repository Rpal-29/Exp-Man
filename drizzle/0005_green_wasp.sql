CREATE TABLE IF NOT EXISTS "debts" (
	"id" text PRIMARY KEY NOT NULL,
	"amount" integer NOT NULL,
	"Debt" text NOT NULL,
	"date" timestamp NOT NULL,
	"account_id" text NOT NULL,
	"category_id" text
);
--> statement-breakpoint
ALTER TABLE "budgets" ADD COLUMN "Goal" text NOT NULL;--> statement-breakpoint
ALTER TABLE "budgets" DROP COLUMN IF EXISTS "payee";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "debts" ADD CONSTRAINT "debts_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "debts" ADD CONSTRAINT "debts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
