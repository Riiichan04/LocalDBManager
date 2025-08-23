import { DatabaseConnection, DatabaseTableDetail, FieldDetail, TableDetail } from "@/types/Connection";
import axios from "axios";

//Get all databases from a connection
export async function fetchDatabase(config: DatabaseConnection): Promise<string[]> {
    const res = await axios.post<string[]>('/api/databases', config, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.data
}

//Get all tables from a database
export async function fetchTableFromDatabase(config: DatabaseTableDetail): Promise<string[]> {
    const res = await axios.post<string[]>('/api/tables', config, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.data
}


//Get all data from a table
export async function fetchTableRows(config: TableDetail): Promise<Record<string, unknown>[]> {
    const res = await axios.post('/api/fields', config)
    return res.data
}

//Get all column type from a table
export async function fetchTableDataType(config: TableDetail): Promise<FieldDetail[]> {
    const res = await axios.post('/api/table-types', config)
    return res.data
}

//Get all index from a table
export async function fetchTableIndex(config: TableDetail) {
    const res = await axios.post('/api/database-index', config)
    return res.data
}

//Get all trigger from a database
export async function fetchDatabaseTrigger(config: DatabaseTableDetail) {
    const res = await axios.post('/api/database-triggers', config)
    return res.data
}

//Get all function from a database
export async function fetchDatabaseFunction(config: DatabaseTableDetail) {
    const res = await axios.post('/api/database-function', config)
    return res.data
}

//Get all views from a database
export async function fetchDatabaseViews(config: DatabaseTableDetail) {
    const res = await axios.post('/api/database-views', config)
    return res.data
}

//Get all users from a database
export async function fetchDatabaseUsers(config: DatabaseTableDetail) {
    const res = await axios.post('/api/database-users', config)
    return res.data
}