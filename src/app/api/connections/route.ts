import { DatabaseConnection } from "@/types/Connection";
import { NextResponse } from "next/server";
import fs from 'fs'
import path from 'path'

export async function GET() {
    try {
        let existing = []
        const filePath = createConnectionFile()
        const content = fs.readFileSync(filePath, 'utf8')
        try {
            const parsed = JSON.parse(content)
            if (Array.isArray(parsed)) {
                existing = parsed
            }
        } catch {
            existing = []
        }
        return NextResponse.json({ data: existing })
    }
    catch (err) {
        return NextResponse.json({ data: [], error: err })
    }
}

export async function POST(req: Request) {
    const body = await req.json()
    const connection: DatabaseConnection = body.connection
    const language = body.language

    try {
        const filePath = createConnectionFile()
        let existing = []
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8')
            try {
                const parsed = JSON.parse(content)
                if (Array.isArray(parsed)) {
                    existing = parsed
                }
            } catch {
                existing = []
            }

            existing.push({ ...connection, language })
        }

        fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf8')
        return NextResponse.json({ result: true })
    }
    catch (err: unknown) {
        return NextResponse.json({ result: false, message: err }, { status: 500 })
    }
}

function createConnectionFile(): string {
    try {
        const dirPath = path.join(process.cwd(), 'src/data')
        const filePath = path.join(dirPath, 'connection.json')

        if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true })
        if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8')
        return filePath
    }
    catch (err: unknown) {
        throw err
    }
}