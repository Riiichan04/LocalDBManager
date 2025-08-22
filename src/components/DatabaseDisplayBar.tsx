import { fetchDatabase, fetchTableFromDatabase } from "@/services/databaseService"
import { DatabaseConnection } from "@/types/Connection"
import { useEffect, useState } from "react"
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import BorderAllRoundedIcon from '@mui/icons-material/BorderAllRounded';
import '@/styles/table.css'

type DisplayDatabaseBarProps = {
    currentConnection: DatabaseConnection | null,
    //Optional behavior for each feature that used this component
    handleTableAction?: (dbName: string, tableName: string) => Promise<string>,
    handleDatabaseAction?: (dbName: string) => void,
    isNotExpaned?: true
}

export default function DisplayDatabaseBar(props: DisplayDatabaseBarProps) {
    const [expanded, setExpanded] = useState<Set<string>>(new Set())    //Expand DB to see table
    const [listTable, setListTable] = useState<Record<string, string[]>>({})  //List loaded table
    const [listDatabase, updateListDatabase] = useState<string[]>([])   //For database display
    const [activeLine, setActiveLine] = useState<string>('')    //Current line (db or table)

    const loadTableFromDatabase = async (dbName: string) => {
        if (props.currentConnection && !props.isNotExpaned) {
            const isOpen = expanded.has(dbName)
            const newExpanded = new Set(expanded)

            if (isOpen) {
                newExpanded.delete(dbName)
            }
            else newExpanded.add(dbName)

            //Only load if absent
            if (!listTable[dbName]) {
                const listTable = await fetchTableFromDatabase({
                    connection: props.currentConnection, databaseName: dbName
                })
                setListTable(prev => ({ ...prev, [dbName]: listTable }))
            }

            setExpanded(newExpanded)
        }
        //Add effect here
    }

    useEffect(() => {
        const currentConnection = props.currentConnection
        if (currentConnection) {
            const fetchDatabaseData = async () => {
                const listDbs = await fetchDatabase(currentConnection)
                updateListDatabase(listDbs)
            }
            fetchDatabaseData()
        }
        //Edit effect here
    }, [props.currentConnection])

    return (
        <>
            <div className="col-span-2 border-e" style={{ overflow: 'auto' }}>
                {listDatabase.map((db) => (
                    <div key={db}>
                        <div
                            className={`py-2 px-1 flex cursor-pointer select-none text-button ${activeLine === db ? 'active-table-bar' : ''}`}
                            onClick={() => (props.handleDatabaseAction ?? loadTableFromDatabase)?.(db)}
                        >
                            {expanded.has(db) ? <ExpandMoreRoundedIcon /> : <ChevronRightRoundedIcon />}
                            <StorageRoundedIcon />
                            <span className="ms-2 truncate" title={db}>{db}</span>
                        </div>
                        {!props.isNotExpaned && expanded.has(db) && (listTable[db] || []).map(table =>
                            <div key={table} className={`truncate ps-5 cursor-pointer select-none text-button ${activeLine === table ? 'active-table-bar' : ''}`}
                                onClick={async () => {
                                    if (props.handleTableAction) {
                                        const activeTable = await props.handleTableAction(db, table)
                                        setActiveLine(activeTable)
                                    }

                                }}
                            >
                                <BorderAllRoundedIcon sx={{ fontSize: '14px' }} />
                                <span className="ms-2" title={table}>{table}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}