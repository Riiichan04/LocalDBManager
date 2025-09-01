import { deleteConnection, getConnection } from "@/services/connectionService"
import { DatabaseConnection } from "@/types/Connection"
import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import EditConnectionForm from "../forms/EditConnectionForm"

export default function ManageConnection() {
    const [isLoading, setLoading] = useState(false)
    const [isReload, setReload] = useState(false)
    const [listConnection, updateListConnection] = useState<DatabaseConnection[]>([])
    const [activeLine, setActiveLine] = useState(-1)    //Current line

    const [editConnectionIndex, updateConnectionIndex] = useState(-1)
    const [currentEditConnection, updateCurrentEditConnection] = useState<DatabaseConnection | null>(null)
    const [editConnectionFormState, setEditConnectionForm] = useState(false)

    const handleDeleteConnection = (index: number) => {
        deleteConnection(index)
        setReload(true)
    }

    const updateEditConnectionForm = () => {
        setEditConnectionForm(!editConnectionFormState)
    }

    const openEditForm = (connection: DatabaseConnection, index: number) => {
        updateCurrentEditConnection(connection)
        updateConnectionIndex(index)
        setEditConnectionForm(true)
    }

    useEffect(() => {
        const fetchListConnection = async () => {
            if (isReload || !isLoading) {
                const result = await getConnection()
                updateListConnection(result.data)
                setLoading(true)
                setReload(false)
            }
        }
        fetchListConnection()
    }, [isReload, isLoading])

    return (
        <>
            <table className="min-w-max border-collapse border-b-0 table-fixed w-full">
                <thead>
                    <tr className="border-t">
                        <th className="border-b"><h5 className="text-start p-2 font-bold">Connection</h5></th>
                        <th className="border-b"><h5 className="text-start p-2 font-bold">Loại connection</h5></th>
                        <th className="border-b"><h5 className="text-start p-2 font-bold">Ngày tạo</h5></th>
                        <th className="border-b"></th>
                    </tr>
                </thead>
                {isLoading &&
                    <tbody>
                        {listConnection.map((ele, index) => (
                            <tr onClick={() => setActiveLine(index)} key={"connection_" + index} className={activeLine === index ? 'active-row' : ''}>
                                <td className="border-b border-b-gray-600 cursor-pointer p-2 truncate ">{ele.name}</td>
                                {/* 2 lines below is temp code, will be fixed later */}
                                <td className="border-b border-b-gray-600 cursor-pointer p-2 truncate ">MySQL</td>
                                <td className="border-b border-b-gray-600 cursor-pointer p-2 truncate ">20/08/2025</td>
                                <td className="border-b border-b-gray-600 p-2">
                                    <div className="flex items-center gap-10">
                                        <button className="border cursor-pointer p-2 px-3 rounded main-cta-button" onClick={() => openEditForm(ele, index)}>Chỉnh sửa</button>
                                        <button className="border cursor-pointer p-2 px-3 rounded text-button" onClick={() => handleDeleteConnection(index)}>Xóa</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }
            </table>
            {!isLoading &&
                <div className="h-full justify-center flex">
                    <div className="col-span-2 flex items-center justify-center" >
                        <CircularProgress />
                    </div>
                </div>
            }
            {editConnectionFormState && <EditConnectionForm connection={currentEditConnection} index={editConnectionIndex} setDisplayEditConnectionForm={updateEditConnectionForm} />}
        </>
    )
}