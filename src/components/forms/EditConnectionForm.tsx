import { updateConnection } from '@/services/connectionService';
import { DatabaseConnection } from '@/types/Connection';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useRef, useState } from 'react';
import SnackBarComponent from '../SnackBarComponent';

type EditConnectionFormProps = {
    setDisplayEditConnectionForm: () => void,
    index: number,
    connection: DatabaseConnection | null
}

export default function EditConnectionForm(props: EditConnectionFormProps) {
    const [snackbarState, setSnackbarState] = useState(false);
    const [addResult, setResult] = useState<boolean | null>(null)

    const refs = {
        name: useRef<HTMLInputElement>(null),
        host: useRef<HTMLInputElement>(null),
        port: useRef<HTMLInputElement>(null),
        username: useRef<HTMLInputElement>(null),
        password: useRef<HTMLInputElement>(null),
    }

    const editConnection = async (event: React.MouseEvent<HTMLButtonElement>) => {
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

        const result = await updateConnection(newConnection, props.index)
        setResult(result.result)
        setSnackbarState(true)

        //Clear input form
        nameEle.value = ""
        hostEle.value = ""
        portEle.value = ""
        userEle.value = ""
        passEle.value = ""
        button.disabled = false
    }

    return (
        <div className="absolute w-full h-full flex items-center justify-center" style={{ color: 'black', top: '0' }}>
            <div className="bg-black opacity-50 w-full h-full absolute z-0"
                onClick={props.setDisplayEditConnectionForm}
            ></div>

            <div className="p-3 px-6 bg-white z-10 rounded relative">
                <div className="form--header flex justify-between">
                    <h5 className="font-semibold">Chỉnh sửa connection</h5>
                    <div className='form--close-button cursor-pointer' onClick={props.setDisplayEditConnectionForm}>
                        <CloseRoundedIcon />
                    </div>
                </div>

                <div className="mt-15" >
                    <div className="my-3 flex justify-between items-center">
                        <p>Tên connection:</p>
                        <input defaultValue={props.connection?.name || ""} ref={refs.name} id="form-connection-name" className="px-2 py-1 border rounded ms-3" type="text" />
                    </div>
                    <div className="my-3 flex justify-between items-center">
                        <p>Host:</p>
                        <input defaultValue={props.connection?.host || ""} ref={refs.host} id="form-connection-host" className="px-2 py-1 border rounded ms-3" type="text" />
                    </div>
                    <div className="my-3 flex justify-between items-center">
                        <p>Port:</p>
                        <input defaultValue={props.connection?.port || ""} ref={refs.port} id="form-connection-port" className="px-2 py-1 border rounded ms-3" type="number" />
                    </div>
                    <div className="my-3 flex justify-between items-center">
                        <p>Username:</p>
                        <input defaultValue={props.connection?.username || ""} ref={refs.username} id="form-connection-username" className="px-2 py-1 border rounded ms-3" type="text" />
                    </div>
                    <div className="my-3 flex justify-between items-center">
                        <p>Password:</p>
                        <input defaultValue={props.connection?.password || ""} ref={refs.password} id="form-connection-password" className="px-2 py-1 border rounded ms-3" type="password" />
                    </div>

                    <div className='flex justify-end mt-8'>
                        <button className='rounded border-0 main-cta-button p-2 cursor-pointer'
                            onClick={editConnection}
                        >
                            Cập nhật
                        </button>
                    </div>
                </div>
                {snackbarState &&
                    <SnackBarComponent
                        closeSnackBar={() => setSnackbarState(false)}
                        result={addResult}
                        message={{
                            success: "Cập nhật connection thành công",
                            failed: "Cập nhật connection thất bại",
                            neutral: null
                        }} />
                }
            </div>
        </div>
    )
}