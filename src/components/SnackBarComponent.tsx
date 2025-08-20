import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Alert, IconButton, Snackbar, SnackbarCloseReason } from '@mui/material';
import { Fragment } from 'react';

type SnackBarComponentProps = {
    closeSnackBar: () => void,
    result: boolean | null,
    message: {
        success: string,
        failed: string,
        neutral: string | null
    }
}

export default function SnackBarComponent(props: SnackBarComponentProps) {
    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        props.closeSnackBar();
    };

    const actionButton = (
        <Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseRoundedIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );

    return (
        <>
            {props.result !== null &&
                <Snackbar
                    open={props.result}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    action={actionButton}
                >
                    <Alert
                        onClose={handleClose}
                        severity={props.result ? "success" : "error"}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {props.result ? props.message.success : props.message.failed}
                    </Alert>

                </Snackbar>
            }
        </>
    )
}

