import mysql, { } from 'mysql2/promise'
import { FieldDetail, TableDetail } from "@/types/Connection";
import { NextResponse } from "next/server";

export interface ShowColumnResult {
    Field: string
    Type: string
    Null: string
    Key: string
    Default: string | null
    Extra: string
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const databaseDetail: TableDetail = body

        const connection = await mysql.createConnection({
            host: databaseDetail.connection.host,
            port: databaseDetail.connection.port,
            user: databaseDetail.connection.username,
            password: databaseDetail.connection.password,
            database: databaseDetail.databaseName
        })

        const [rows] = await connection.query(`SHOW COLUMNS FROM ${databaseDetail.tableName} FROM ${databaseDetail.databaseName}`)
        return NextResponse.json((rows as ShowColumnResult[]).map(row => ({
            fieldName: row.Field,
            fieldType: row.Type
        }) as FieldDetail))
    } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error'
        return NextResponse.json({ error: msg }, { status: 500 })
    }
}