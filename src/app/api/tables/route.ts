import mysql, { RowDataPacket } from 'mysql2/promise'
import { DatabaseTableDetail } from "@/types/Connection";
import { NextResponse } from "next/server";

interface TableRow extends RowDataPacket {
  [key: `Tables_in_${string}`]: string
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const databaseConnection: DatabaseTableDetail = body

        const connection = await mysql.createConnection({
            host: databaseConnection.connection.host,
            user: databaseConnection.connection.username,
            password: databaseConnection.connection.password,
            port: databaseConnection.connection.port
        })

        const dbName = databaseConnection.databaseName
        const [rows] = await connection.query<TableRow[]>(`SHOW TABLES FROM \`${dbName}\``)
        const dbs = (rows).map(r => r[`Tables_in_${dbName}`])

        return NextResponse.json(dbs)
    }
    catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        return NextResponse.json({ error: errorMessage }, { status: 500 })
    }
}