import { DatabaseConnection } from "@/types/Connection";
import { NextResponse } from "next/server";
import fs from 'fs'
import path from 'path'

//Get list connections
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

//Upload new connection
export async function POST(req: Request) {
    const body = await req.json()
    const connection: DatabaseConnection = body //Temp
    // const language = body.language
    const language = "MySQL"

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

        fs.writeFileSync(filePath, JSON.stringify(existing, null, 4), 'utf8')
        return NextResponse.json({ result: true })
    }
    catch (err: unknown) {
        return NextResponse.json({ result: false, message: err }, { status: 500 })
    }
}

//Delete connection by index
export async function DELETE(req: Request) {
    const body = await req.json()
    const connectionIndex: number = body

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
            existing = existing.filter((ele, index) => index !== connectionIndex)
        }

        fs.writeFileSync(filePath, JSON.stringify(existing, null, 4), 'utf8')
        return NextResponse.json({ result: true })
    }
    catch (err: unknown) {
        return NextResponse.json({ result: false, message: err }, { status: 500 })
    }
}

//Update current connection
export async function PUT(req: Request) {
    const body = await req.json()
    const updatedConnectionDetail: DatabaseConnection = body.connection
    const updatedIndex: number = body.updateIndex
    const language = "MySQL"    //Temp

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

        }

        existing[updatedIndex] = { ...updatedConnectionDetail, language }

        fs.writeFileSync(filePath, JSON.stringify(existing, null, 4), 'utf8')
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
        if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([], null, 4), 'utf8')
        return filePath
    }
    catch (err: unknown) {
        throw err
    }
}