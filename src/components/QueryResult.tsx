import { QueryResult } from "@/types/QueryResult"

type QueryResultProps = {
    result: QueryResult,
    query?: string,
}

export function QueryResultDisplay({ result }: QueryResultProps) {
    if (result.type === "ERROR") {
        return <div className="text-red-500 font-semibold">{String(result.message)}</div>
    }

    switch (result.type) {
        case 'SELECT':
            return <SelectResultTable rows={result.rows} />
        case 'INSERT':
            return <div className="text-green-600">{result.affectedRows} rows inserted. ID: {result.insertId}</div>
        case 'UPDATE':
            return <div className="text-green-600">{result.affectedRows} rows updated.</div>
        case 'DELETE':
            return <div className="text-green-600">{result.affectedRows} rows deleted.</div>
        default:
            return <div className="text-blue-600">Query executed. {String(result.message) ? `: ${String(result.message)}` : ''}.</div>
    }
}

type SelectResultTableProps = {
    rows: Array<Record<string, unknown>>
}

const SelectResultTable = ({ rows }: SelectResultTableProps) => {
    if (rows.length === 0) return <div className="text-gray-500">Không có kết quả</div>

    const columns = Object.keys(rows[0])

    const formatValue = (value: unknown): string => {
        if (value === null || value === undefined) return 'null'
        if (typeof value === 'object') return JSON.stringify(value)
        return String(value)
    }

    return (
        <div className="w-full overflow-auto">
            <table className=" border border-gray-300 text-sm overflow-auto">
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th key={col} className="border px-2 py-1 text-left">{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, idx) => (
                        <tr key={idx}>
                            {columns.map(col => (
                                <td key={col} className="border px-2 py-1">
                                    {formatValue(row[col])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

