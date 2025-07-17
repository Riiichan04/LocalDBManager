// import mysql, {  } from 'mysql2/promise'
// import { RowDetail } from "@/types/Connection";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//     try {
//         const body = await req.json()
//         const databaseDetail: RowDetail = body

//         const connection = await mysql.createConnection({
//             host: databaseDetail.detail.connection.host,
//             port: databaseDetail.detail.connection.port,
//             user: databaseDetail.detail.connection.username,
//             password: databaseDetail.detail.connection.password,
//             database: databaseDetail.detail.databaseName
//         })

//         const [rows] = await connection.query(`UPDATE ${databaseDetail.detail.tableName} SET ${databaseDetail.field} = ${databaseDetail.newData}`)
//         return NextResponse.json(rows)
//     } catch (err) {
//         const msg = err instanceof Error ? err.message : 'Unknown error'
//         return NextResponse.json({ error: msg }, { status: 500 })
//     }
// }