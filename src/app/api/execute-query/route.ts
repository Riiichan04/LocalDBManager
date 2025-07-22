import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { DatabaseTableDetail } from "@/types/Connection";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const databaseDetail: DatabaseTableDetail = body.connection
        const query: string = body.query

        const connection = await mysql.createConnection({
            host: databaseDetail.connection.host,
            port: databaseDetail.connection.port,
            user: databaseDetail.connection.username,
            password: databaseDetail.connection.password,
            database: databaseDetail.databaseName
        })

        const [result] = await connection.query<RowDataPacket[] | ResultSetHeader>(query)
        await connection.end()

        const queryType = query.trim().split(/\s+/)[0].toUpperCase()

        switch (queryType) {
            case 'SELECT':
                return NextResponse.json({ type: 'SELECT', rows: result as RowDataPacket[] })

            case 'INSERT':
                return NextResponse.json({
                    type: 'INSERT',
                    insertId: (result as ResultSetHeader).insertId,
                    affectedRows: (result as ResultSetHeader).affectedRows
                })

            case 'UPDATE':
            case 'DELETE':
                return NextResponse.json({
                    type: queryType,
                    affectedRows: (result as ResultSetHeader).affectedRows
                })
            default:
                return NextResponse.json({
                    type: 'OTHER',
                    message: 'Query executed successfully'
                })
        }
    } catch (err: unknown) {
        const error = err instanceof Error ? err.message : ""

        return NextResponse.json({
            type: 'ERROR',
            message: error
        })
    }
}