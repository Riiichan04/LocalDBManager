import { fetchDatabase, fetchTableFromDatabase, fetchTableRows } from "@/services/databaseService"
import { DatabaseConnection } from "@/types/Connection"
import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import BorderAllRoundedIcon from '@mui/icons-material/BorderAllRounded';

export default function TableComponent() {
    const [listDatabase, updateListDatabase] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [expanded, setExpanded] = useState<Set<string>>(new Set())    //Expand DB to see table
    const [listTable, setListTable] = useState<Record<string, string[]>>({})  //List loaded table
    const [rows, setRows] = useState<Record<string, unknown>[]>([])
    const [columns, setColumns] = useState<string[]>([])

    const tempConnection = {
        host: '',
        username: '',
        password: '',
        name: '',
        port: 3306
    }

    const loadTableFromDatabase = async (dbName: string) => {
        const isOpen = expanded.has(dbName)
        const newExpanded = new Set(expanded)

        if (isOpen) {
            newExpanded.delete(dbName)
        }
        else newExpanded.add(dbName)

        //Only load if absent
        if (!listTable[dbName]) {
            const listTable = await fetchTableFromDatabase({
                connection: tempConnection, databaseName: dbName
            })
            setListTable(prev => ({ ...prev, [dbName]: listTable }))
        }

        setExpanded(newExpanded)
    }

    const loadTableData = async (dbName: string, tableName: string) => {
        const data = await fetchTableRows({ connection: tempConnection, databaseName: dbName, tableName: tableName })
        setRows(data)
        if (data.length > 0) {
            setColumns(Object.keys(data[0]))
        }
    }

    useEffect(() => {
        const tempConfig: DatabaseConnection = {
            host: '',
            username: '',
            password: '',
            name: '',
            port: 3306
        }

        const fetchDatabaseData = async () => {
            const listDbs = await fetchDatabase(tempConfig)
            updateListDatabase(listDbs)
            setLoading(true)
        }

        fetchDatabaseData()
    }, [])

    return (
        <>
            {!loading ?
                <CircularProgress /> :
                <div className="grid grid-cols-12 border-t flex" style={{ height: '100%' }}>
                    <div className="col-span-2 border-e" style={{ overflow: 'auto' }}>
                        {listDatabase.map((db) => (
                            <div key={db}>
                                <div
                                    className="p-2 flex cursor-pointer select-none text-button"
                                    onClick={() => loadTableFromDatabase(db)}
                                >
                                    {expanded.has(db) ? <ExpandMoreRoundedIcon /> : <ChevronRightRoundedIcon />}
                                    <StorageRoundedIcon />
                                    <span className="ms-2" title={db}>{db}</span>
                                </div>
                                {expanded.has(db) && (listTable[db] || []).map(table =>
                                    <div key={table} className="truncate ms-5 cursor-pointer select-none text-button"
                                        onClick={() => loadTableData(db, table)}
                                    >
                                        <BorderAllRoundedIcon sx={{ fontSize: '14px' }} />
                                        <span className="ms-2" title={table}>{table}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="col-span-10" style={{ overflow: 'auto' }}>
                        <table className="min-w-max border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    {columns.map(col => (
                                        <th key={col} className="border p-2 text-left bg-gray-100">{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, i) => (
                                    <tr key={i}>
                                        {columns.map(col => (
                                            <td key={col} className="border p-2 truncate max-w-[200px]">{String(row[col])}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </>
    )
}

