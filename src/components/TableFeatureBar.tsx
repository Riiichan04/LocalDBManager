import { getConnection } from '@/services/connectionService';
import { DatabaseConnection } from '@/types/Connection';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useEffect, useState } from 'react';

type TableFeatureBarProps = {
    currentConnection: DatabaseConnection | null,
    setCurrentConnection: (newConnection: DatabaseConnection) => void
}

export default function TableFeatureBar(props: TableFeatureBarProps) {
    const [listConnection, updateListConnection] = useState<DatabaseConnection[]>([])

    useEffect(() => {
        const fetchListConnection = async () => {
            const result = await getConnection()
            updateListConnection(result.data)
        }
        fetchListConnection()
    }, [])

    const changeConnection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        try {
            const connectionKey = event.target.value
            const connectionIndex = parseInt(connectionKey.substring(connectionKey.indexOf('_') + 1))
            props.setCurrentConnection(listConnection[connectionIndex])
        }
        catch (error: unknown) {
            //Temp, will be changed later
            console.log(error)
        }
    }

    //FIXME: Temp function, will be fixed later
    const getConnectionIndex = (connection: DatabaseConnection | null): string => {
        if (!connection) return "none"
        for (let i = 0; i < listConnection.length; i++) {
            if (listConnection[i].name === connection.name) return `connection_${i}`
        }
        return "none"
    }

    return (
        <div className="grid grid-cols-12 gap-4 p-2">
            <div className="col-span-2 flex justify-center">
                <select className="border rounded p-1 px-2" value={getConnectionIndex(props.currentConnection)} onChange={changeConnection}>
                    <option value={"none"} disabled >Chọn một connection</option>
                    {listConnection.length > 0 && listConnection.map((ele, index) => <option value={`connection_${index}`} key={`connection_${index}`}>{ele.name}</option>)}
                </select>
            </div>
            <div className="col-span-2">
                <button className="p-1 px-2 rounded flex content-center main-cta-button">
                    <AddRoundedIcon className="pe-1" />
                    Thêm một connection
                </button>
            </div>
        </div>
    )
}

