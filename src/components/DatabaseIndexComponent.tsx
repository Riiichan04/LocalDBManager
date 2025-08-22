// import { fetchDatabase, fetchTableDataType, fetchTableFromDatabase, fetchTableRows } from "@/services/databaseService"
import { fetchTableDataType, fetchTableIndex } from "@/services/databaseService"
import { DatabaseConnection, FieldDetail } from "@/types/Connection"
import { CircularProgress } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import '@/styles/table.css'
import DisplayDatabaseBar from "./DatabaseDisplayBar"

type DatabaseIndexComponentProps = {
    currentConnection: DatabaseConnection | null
}

export default function DatabaseIndexComponent(props: DatabaseIndexComponentProps) {
    const [loading, setLoading] = useState(false)
    const [columns, setColumns] = useState<FieldDetail[]>([])
    const [rows, setRows] = useState<Record<string, unknown>[]>([]) //For row display
    const [selectedCell, setSelectedCell] = useState<{ row: number; col: string } | null>(null) //For effect when clicking a cell

    const tableRef = useRef<HTMLTableElement>(null)
    const loadTableData = async (dbName: string, tableName: string): Promise<string> => {
        if (props.currentConnection) {
            const data = await fetchTableIndex({ connection: props.currentConnection, databaseName: dbName, tableName: tableName })
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
        //Add effect here
        return ""
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
                    <DisplayDatabaseBar currentConnection={props.currentConnection} loadTableData={loadTableData} />
                    <div className="col-span-10" style={{ overflow: 'auto' }}>
                        <table ref={tableRef} className="min-w-max border-collapse border border-gray-300 table-fixed w-full">
                            <thead>
                                <tr>
                                    {columns.map((col, i) => (
                                        <th key={col.fieldName}
                                            className="relative border p-2 text-left cursor-pointer select-none group"
                                        >
                                            <div className="truncate"
                                                style={{ minWidth: `${Math.max(120, col.fieldName.length * 8)}px`, maxWidth: `${Math.max(120, col.fieldName.length * 8) * 2}` }}
                                            >
                                                <p className="font-semibold flex items-center">
                                                    {col.fieldName}
                                                </p>
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