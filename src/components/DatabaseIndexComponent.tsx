import { fetchDatabase, fetchTableDataType, fetchTableFromDatabase, fetchTableRows } from "@/services/databaseService"
import { DatabaseConnection, FieldDetail } from "@/types/Connection"
import { DataTypeIcon } from "@/types/IconType"
import { CircularProgress } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import BorderAllRoundedIcon from '@mui/icons-material/BorderAllRounded';
import '@/styles/table.css'

type DatabaseIndexComponentProps = {
    currentConnection: DatabaseConnection | null
}

export default function DatabaseIndexComponent(props: DatabaseIndexComponentProps) {
    const [loading, setLoading] = useState(false)
    const [expanded, setExpanded] = useState<Set<string>>(new Set())    //Expand DB to see table
    const [listTable, setListTable] = useState<Record<string, string[]>>({})  //List loaded table
    const [listDatabase, updateListDatabase] = useState<string[]>([])   //For database display
    const [rows, setRows] = useState<Record<string, unknown>[]>([]) //For row display
    const [columns, setColumns] = useState<FieldDetail[]>([])   //For column detail display
    const [activeLine, setActiveLine] = useState<string>('')    //Current line (db or table)
    const [selectedCell, setSelectedCell] = useState<{ row: number; col: string } | null>(null) //For effect when clicking a cell
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null) //For soring column

    const tableRef = useRef<HTMLTableElement>(null)

    const loadTableFromDatabase = async (dbName: string) => {
        if (props.currentConnection) {

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
            setActiveLine(dbName)
        }
        //Add effect here
    }

    const loadTableData = async (dbName: string, tableName: string) => {
        if (props.currentConnection) {

            const data = await fetchTableRows({ connection: props.currentConnection, databaseName: dbName, tableName: tableName })
            setRows(data)
            const tableDataType: FieldDetail[] = await fetchTableDataType({ connection: props.currentConnection, databaseName: dbName, tableName: tableName })
            const listColumn: FieldDetail[] = []
            if (data.length > 0) {
                const listName = Object.keys(data[0])
                listName.forEach(name => {
                    const dataType = tableDataType.find(obj => obj.fieldName === name)?.fieldType
                    listColumn.push({ fieldName: name, fieldType: dataType || "" })
                })
            }
            else listColumn.push(...tableDataType)
            setColumns(listColumn)
            setActiveLine(tableName)
        }
        //Add effect here
    }

    const handleSort = (key: string) => {
        setSortConfig(prev => {
            if (prev?.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
            } else {
                return { key, direction: 'asc' }
            }
        })
    }

    const sortedRows = () => {
        if (!sortConfig) return rows

        const { key, direction } = sortConfig

        return [...rows].sort((a, b) => {
            const aVal = a[key]
            const bVal = b[key]

            // Convert to string for localeCompare if text
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return direction === 'asc'
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal)
            }

            // Convert to number if possible
            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return direction === 'asc' ? aVal - bVal : bVal - aVal
            }

            // Fallback to string compare
            return direction === 'asc'
                ? String(aVal).localeCompare(String(bVal))
                : String(bVal).localeCompare(String(aVal))
        })
    }

    const handleMouseDown = (e: React.MouseEvent, colIndex: number) => {
        const startX = e.clientX
        const startWidth = tableRef.current!.rows[0].cells[colIndex].offsetWidth

        const onMouseMove = (e: MouseEvent) => {
            const newWidth = startWidth + (e.clientX - startX)
            tableRef.current!.querySelectorAll('tr').forEach(row => {
                const cell = row.cells[colIndex]
                if (cell) cell.style.width = `${newWidth}px`
            })
        }

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }

    useEffect(() => {
        const currentConnection = props.currentConnection
        if (currentConnection) {
            const fetchDatabaseData = async () => {
                const listDbs = await fetchDatabase(currentConnection)
                updateListDatabase(listDbs)
                setLoading(true)
            }
            fetchDatabaseData()
        }
        //Edit effect here
    }, [props.currentConnection])

    return (
        <div className="grid grid-cols-12 border-t" style={{ height: '100%' }}>
            {!props.currentConnection ? <></> : !loading ?
                <div className="h-full justify-center flex">
                    <div className="col-span-2 flex items-center justify-center" >
                        <CircularProgress />
                    </div>
                </div> :
                <>
                    <div className="col-span-2 border-e" style={{ overflow: 'auto' }}>
                        {listDatabase.map((db) => (
                            <div key={db}>
                                <div
                                    className={`py-2 px-1 flex cursor-pointer select-none text-button ${activeLine === db ? 'active-table-bar' : ''}`}
                                    onClick={() => loadTableFromDatabase(db)}
                                >
                                    {expanded.has(db) ? <ExpandMoreRoundedIcon /> : <ChevronRightRoundedIcon />}
                                    <StorageRoundedIcon />
                                    <span className="ms-2 truncate" title={db}>{db}</span>
                                </div>
                                {expanded.has(db) && (listTable[db] || []).map(table =>
                                    <div key={table} className={`truncate ps-5 cursor-pointer select-none text-button ${activeLine === table ? 'active-table-bar' : ''}`}
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
                        <table ref={tableRef} className="min-w-max border-collapse border border-gray-300 table-fixed w-full">
                            <thead>
                                
                            </thead>
                            <tbody style={{ fontSize: '14px' }}>
                               
                            </tbody>
                        </table>
                    </div>
                </>
            }
        </div>
    )
}