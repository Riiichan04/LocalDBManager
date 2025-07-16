import mysql, { RowDataPacket } from 'mysql2/promise'
import { DatabaseConnection } from "@/types/Connection";
import { NextResponse } from "next/server";

interface DatabaseRow extends RowDataPacket { Database: string }

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const databaseConnection: DatabaseConnection = body

        const connection = await mysql.createConnection({
            host: databaseConnection.host,
            user: databaseConnection.username,
            password: databaseConnection.password,
            port: databaseConnection.port
        })

        const [rows] = await connection.query<DatabaseRow[]>("SHOW DATABASES")
        const dbs = (rows).map(r => r.Database)

        return NextResponse.json(dbs)
    }
    catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        return NextResponse.json({ error: errorMessage }, { status: 500 })
    }
}