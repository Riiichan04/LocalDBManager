import mysql, { } from 'mysql2/promise'
import { TableDetail } from "@/types/Connection"
import { NextResponse } from 'next/server'

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

        const [rows] = await connection.query(
            `SHOW INDEX FROM ?? FROM ??`,
            [databaseDetail.tableName, databaseDetail.databaseName]
        )

        return NextResponse.json(rows)
    }
    catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error'
        return NextResponse.json({ error: msg }, { status: 500 })
    }
}