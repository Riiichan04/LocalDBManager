// import { fetchDatabase, fetchTableDataType, fetchTableFromDatabase, fetchTableRows } from "@/services/databaseService"
import { fetchTableDataType, fetchTableRows } from "@/services/databaseService"
import { DatabaseConnection, FieldDetail } from "@/types/Connection"
import { DataTypeIcon } from "@/types/IconType"
import { CircularProgress } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import '@/styles/table.css'
import DisplayDatabaseBar from "../DatabaseDisplayBar"

type TableComponentProps = {
    currentConnection: DatabaseConnection | null
}

export default function TableComponent(props: TableComponentProps) {
    const [loading, setLoading] = useState(false)
    const [rows, setRows] = useState<Record<string, unknown>[]>([]) //For row display
    const [columns, setColumns] = useState<FieldDetail[]>([])   //For column detail display
    const [selectedCell, setSelectedCell] = useState<{ row: number; col: string } | null>(null) //For effect when clicking a cell
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null) //For soring column

    const tableRef = useRef<HTMLTableElement>(null)

    const loadTableData = async (dbName: string, tableName: string): Promise<string> => {
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
            // setActiveLine(tableName)
            return tableName
        }
        return ""
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
                    <DisplayDatabaseBar currentConnection={props.currentConnection} handleTableAction={loadTableData} />
                    <div className="col-span-10" style={{ overflow: 'auto' }}>
                        <table ref={tableRef} className="min-w-max border-collapse border border-gray-300 table-fixed w-full">
                            <thead>
                                <tr>
                                    {columns.map((col, i) => (
                                        <th key={col.fieldName} onClick={() => handleSort(col.fieldName)}
                                            className="relative border p-2 text-left cursor-pointer select-none group">
                                            <div className="truncate">
                                                <p className="font-semibold flex items-center">
                                                    {sortConfig?.key === col.fieldName && (
                                                        <span className="ms-1">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                                                    )}
                                                    {col.fieldName}
                                                </p>
                                                <div className="truncate">{getColumnDataType(col.fieldType)} <span>{col.fieldType}</span></div>
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
                                {sortedRows().map((row, i) => (
                                    <tr key={i}>
                                        {columns.map((col) => {
                                            const isMain = selectedCell?.row === i && selectedCell?.col === col.fieldName
                                            const isSameRow = selectedCell?.row === i

                                            return (
                                                <td
                                                    key={col.fieldName}
                                                    onClick={() => setSelectedCell({ row: i, col: col.fieldName })}
                                                    className={`border p-2 truncate cursor-pointer ${isMain ? 'active-row' : isSameRow ? 'active-row-other' : ''}`}
                                                >
                                                    {String(row[col.fieldName])}
                                                </td>
                                            )
                                        })}
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