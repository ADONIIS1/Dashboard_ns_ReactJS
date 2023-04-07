import { Fragment, useState } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';

export default function DialogBox({ buttonText, headerText, bodyText, cancelText, confirmText, onCancel, onConfirm }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCancel = () => {
        handleClose();
        onCancel && onCancel();
    };

    const handleConfirm = () => {
        handleClose();
        onConfirm && onConfirm();
    };

    return (
        <Fragment>
            <button onClick={handleOpen} variant="gradient">
                {buttonText}
            </button>
            <Dialog open={open} onClose={handleClose}>
                <DialogHeader>{headerText}</DialogHeader>
                <DialogBody divider>{bodyText}</DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleCancel} className="mr-1">
                        <span>{cancelText}</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleConfirm}>
                        <span>{confirmText}</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    );
}