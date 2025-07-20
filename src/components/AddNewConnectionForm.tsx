import { createAndSaveNewConnection } from '@/services/connectionService';
import { DatabaseConnection } from '@/types/Connection';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Alert, IconButton, Snackbar, SnackbarCloseReason } from '@mui/material';
import { Fragment, useRef, useState } from 'react';

type AddNewConnectionFormProps = {
    setDisplayAddNewConnectionForm: () => void
}

export default function AddNewConnectionForm(props: AddNewConnectionFormProps) {
    const [snackbarState, setSnackbarState] = useState(false);
    const [addResult, setResult] = useState<boolean | null>(null)

    const refs = {
        name: useRef<HTMLInputElement>(null),
        host: useRef<HTMLInputElement>(null),
        port: useRef<HTMLInputElement>(null),
        username: useRef<HTMLInputElement>(null),
        password: useRef<HTMLInputElement>(null),
    }

    const createNewConnection = async (event: React.MouseEvent<HTMLButtonElement>) => {
        //Disable button to prevent spam
        const button = event.currentTarget
        button.disabled = true

        const nameEle = refs.name.current
        const hostEle = refs.host.current
        const portEle = refs.port.current
        const userEle = refs.username.current
        const passEle = refs.password.current

        if (!nameEle || !hostEle || !portEle || !userEle || !passEle) return

        const newConnection: DatabaseConnection = {
            name: nameEle.value,
            host: hostEle.value,
            port: parseInt(portEle.value),
            username: userEle.value,
            password: passEle.value,
        }

        const result = await createAndSaveNewConnection(newConnection)
        setResult(result.result)
        setSnackbarState(result.result)

        //Clear input form
        nameEle.value = ""
        hostEle.value = ""
        portEle.value = ""
        userEle.value = ""
        passEle.value = ""
        button.disabled = false
    }


    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarState(false);
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


    //Will be detached to a single file
    type SnackBarProps = { result: boolean | null }
    const SnackbarComponent = ({ result }: SnackBarProps) => {
        return (
            <>
                {result !== null &&
                    <Snackbar
                        open={snackbarState}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        action={actionButton}
                    >
                        <Alert
                            onClose={handleClose}
                            severity={result ? "success" : "error"}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {result ? "Thêm connection thành công" : "Thêm connection thất bại"}
                        </Alert>

                    </Snackbar>
                }
            </>
        )
    }

    return (
        <div className="absolute w-full h-full flex items-center justify-center">
            <div className="bg-black opacity-50 w-full h-full absolute z-0"
                onClick={props.setDisplayAddNewConnectionForm}
            ></div>

            <div className="p-3 px-6 bg-white z-10 rounded relative">
                <div className="form--header flex justify-between">
                    <h5 className="font-semibold">Thêm một connection mới</h5>
                    <div className='form--close-button cursor-pointer text-button' onClick={props.setDisplayAddNewConnectionForm}>
                        <CloseRoundedIcon />
                    </div>
                </div>

                <div className="mt-15">
                    <div className="my-3 flex justify-between items-center">
                        <p>Tên connection:</p>
                        <input ref={refs.name} id="form-connection-name" className="px-2 py-1 border rounded ms-3" type="text" />
                    </div>
                    <div className="my-3 flex justify-between items-center">
                        <p>Host:</p>
                        <input ref={refs.host} id="form-connection-host" className="px-2 py-1 border rounded ms-3" type="text" />
                    </div>
                    <div className="my-3 flex justify-between items-center">
                        <p>Port:</p>
                        <input ref={refs.port} id="form-connection-port" className="px-2 py-1 border rounded ms-3" type="number" />
                    </div>
                    <div className="my-3 flex justify-between items-center">
                        <p>Username:</p>
                        <input ref={refs.username} id="form-connection-username" className="px-2 py-1 border rounded ms-3" type="text" />
                    </div>
                    <div className="my-3 flex justify-between items-center">
                        <p>Password:</p>
                        <input ref={refs.password} id="form-connection-password" className="px-2 py-1 border rounded ms-3" type="password" />
                    </div>

                    <div className='flex justify-end mt-8'>
                        <button className='rounded border-0 main-cta-button p-2 cursor-pointer'
                            onClick={createNewConnection}
                        >
                            Thêm connection
                        </button>
                    </div>
                </div>
                <SnackbarComponent result={addResult} />

            </div>
        </div>
    )
}