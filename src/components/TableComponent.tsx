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

type TableComponentProps = {
    currentConnection: DatabaseConnection | null
}

export default function TableComponent(props: TableComponentProps) {
    const [listDatabase, updateListDatabase] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [expanded, setExpanded] = useState<Set<string>>(new Set())    //Expand DB to see table
    const [listTable, setListTable] = useState<Record<string, string[]>>({})  //List loaded table
    const [rows, setRows] = useState<Record<string, unknown>[]>([])
    const [columns, setColumns] = useState<FieldDetail[]>([])
    const [activeLine, setActiveLine] = useState<string>('')

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
            if (data.length > 0) {
                const tableDataType: FieldDetail[] = await fetchTableDataType({ connection: props.currentConnection, databaseName: dbName, tableName: tableName })
                const listName = Object.keys(data[0])
                const listColumn: FieldDetail[] = []
                listName.forEach(name => {
                    const dataType = tableDataType.find(obj => obj.fieldName === name)?.fieldType
                    listColumn.push({ fieldName: name, fieldType: dataType || "" })
                })
                setColumns(listColumn)
            }
            setActiveLine(tableName)
        }
        //Add effect here
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

    return (
        <div className="grid grid-cols-12 border-t" style={{ height: '100%' }}>
            {!loading ?
                <div style={{ height: '100%' }}>
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
                                <tr>
                                    {columns.map((col, i) => (
                                        <th key={col.fieldName} className="relative border p-2 text-left bg-gray-100 group">
                                            <div className="truncate">
                                                <p className="font-semibold" >{col.fieldName}</p>
                                                <div className="truncate"> {getColumnDataType(col.fieldType)} <span>{col.fieldType}</span> </div>
                                            </div>
                                            <div
                                                onMouseDown={(e) => handleMouseDown(e, i)}
                                                className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-transparent group-hover:bg-blue-400"
                                            />
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '14px' }}>
                                {rows.map((row, i) => (
                                    <tr key={i}>
                                        {columns.map((col) => (
                                            <td key={col.fieldName} className="border p-2 truncate">{String(row[col.fieldName])}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            }
        </div>
    )
}

function getColumnDataType(type: string) {
    const typeName = type.substring(0, type.indexOf('(') === -1 ? type.length : type.indexOf('(')).toLowerCase()
    return DataTypeIcon[typeName]
}