import mysql, {  } from 'mysql2/promise'
import { DatabaseTableDetail } from "@/types/Connection"
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const databaseDetail: DatabaseTableDetail = body

        const connection = await mysql.createConnection({
            host: databaseDetail.connection.host,
            port: databaseDetail.connection.port,
            user: databaseDetail.connection.username,
            password: databaseDetail.connection.password,
            database: databaseDetail.databaseName
        })
        const [rows] = await connection.query(`show function status where Db = ${connection.escape(databaseDetail.databaseName)}`,)
        return NextResponse.json(rows)
        
        //FIXME: Fix this code
        // const rowsResult = rows as RowDataPacket[]
        // return NextResponse.json(rowsResult.length !== 0 ? rows : fields.map(f => f.name))
    }
    catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error'
        return NextResponse.json({ error: msg }, { status: 500 })
    }
}