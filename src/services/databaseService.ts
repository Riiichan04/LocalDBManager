import { DatabaseConnection, DatabaseTableDetail, FieldDetail, TableDetail } from "@/types/Connection";
import axios from "axios";

export async function fetchDatabase(config: DatabaseConnection): Promise<string[]> {
    const res = await axios.post<string[]>('/api/databases', config, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.data
}

export async function fetchTableFromDatabase(config: DatabaseTableDetail): Promise<string[]> {
    const res = await axios.post<string[]>('/api/tables', config, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.data
}

export async function fetchTableRows(config: TableDetail): Promise<Record<string, unknown>[]> {
    const res = await axios.post('/api/fields', config)
    return res.data
}

export async function fetchTableDataType(config: TableDetail): Promise<FieldDetail[]> {
    const res = await axios.post('/api/table-types', config)
    return res.data
}