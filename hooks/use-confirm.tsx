import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-accounts";

export const useConfirm = (
    title: string,
    message: string,
): [() => JSX.Element, () => Promise<boolean>] => {
    const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

    const mutation = useBulkDeleteAccounts();
    console.log('mutation:', mutation);

    const confirm = () => new Promise<boolean>((resolve, reject) => {
        setPromise({ resolve });
    });

    const handleClose = () => {
        setPromise(null);
    };

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    };

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    };

    const ConfirmationDialog = () => {
        return (
            <Dialog open={promise !== null} onOpenChange={handleClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{message}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="pt-2">
                        <Button onClick={handleCancel} variant="outline">Cancel</Button>
                        <Button onClick={handleConfirm}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    };

    return [ConfirmationDialog, confirm];
};
