"use client"
import { useEffect, useRef } from 'react'
import { EditorView, basicSetup } from 'codemirror'
import { sql } from '@codemirror/lang-sql'
import { Compartment, EditorState } from '@codemirror/state'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorTheme } from '@/types/EditorTheme'
import { QueryResult } from "@/types/QueryResult"

type SqlEditorProps = {
    currentTheme: EditorTheme,
    queryResult: { result: QueryResult; query: string } | null,
    onGetCurrentQuery: (getQuery: () => string) => void
}

export default function SqlEditor({ currentTheme, queryResult, onGetCurrentQuery }: SqlEditorProps) {
    const editorRef = useRef<HTMLDivElement | null>(null)
    const viewRef = useRef<EditorView | null>(null)
    const themeCompartmentRef = useRef(new Compartment())

    const getCurrentQuery = (): string => {
        return viewRef.current?.state.doc.toString() || ''
    }

    useEffect(() => {
        const listEditorTheme = {
            [EditorTheme.DEFAULT]: [],
            [EditorTheme.ONEDARK]: [oneDark]
        }

        if (viewRef.current) {
            const editorTheme = listEditorTheme[currentTheme]
            viewRef.current.dispatch({
                effects: themeCompartmentRef.current.reconfigure(editorTheme)
            })
            return
        }

        if (!editorRef.current) return

        const rect = editorRef.current.getBoundingClientRect()
        const top = rect.top
        const height = window.innerHeight - top - 200
        const lineHeight = 16
        const lineCount = Math.round(height / lineHeight) - 1
        const defaultText = Array(lineCount).fill('').join('\n')

        const editorTheme = listEditorTheme[currentTheme]
        const view = new EditorView({
            state: EditorState.create({
                doc: defaultText,
                extensions: [
                    basicSetup,
                    sql(),
                    themeCompartmentRef.current.of(editorTheme),
                    EditorView.theme({
                        '.cm-gutters': {
                            backgroundColor: 'var(--background-color)'
                        },
                        '.cm-activeLine': {
                            backgroundColor: 'var(--editor-active-color)'
                        },
                        '.cm-selectionBackground': {
                            backgroundColor: 'var(--editor-active-background)'
                        },
                        '&.cm-focused .cm-selectionBackground': {
                            backgroundColor: 'var(--editor-active-background)'
                        },
                    })
                ]
            }),
            parent: editorRef.current
        })

        viewRef.current = view

        if (onGetCurrentQuery) {
            onGetCurrentQuery(() => getCurrentQuery())
        }
        editorRef.current.className = "editor p-0 border "
        editorRef.current.className += currentTheme === EditorTheme.DEFAULT ? "editor-light-theme " : "editor-onedark-theme"

        requestAnimationFrame(() => view.requestMeasure())
    }, [currentTheme, onGetCurrentQuery])

    return (
        <div className="flex flex-col gap-2">
            <div ref={editorRef}
                style={{ fontSize: '14px', minHeight: '300px' }}>
            </div>
            <div className="mt-1 p-1" style={{ minHeight: '10rem' }}>
                <h5 className='my-1 px-2 font-semibold'>Kết quả truy vấn</h5>
                {queryResult &&
                    <>
                        <div className="result-detail mb-2 px-2">
                            <p>Thời gian thực hiện: <span>{queryResult.result.executeTime} ms</span></p>
                        </div>
                        <QueryResultDisplay result={queryResult.result} query={queryResult.query} />
                    </>}
            </div>
        </div>
    )
}


type QueryResultProps = {
    result: QueryResult,
    query?: string,
}

export function QueryResultDisplay({ result }: QueryResultProps) {
    if (result.type === "ERROR") {
        return <div className="text-red-500 font-semibold">{String(result.message)}</div>
    }

    switch (result.type) {
        case 'SELECT':
            return <SelectResultTable rows={result.rows} />
        case 'INSERT':
            return <div className="text-green-600">{result.affectedRows} rows inserted. ID: {result.insertId}</div>
        case 'UPDATE':
            return <div className="text-green-600">{result.affectedRows} rows updated.</div>
        case 'DELETE':
            return <div className="text-green-600">{result.affectedRows} rows deleted.</div>
        default:
            return <div className="text-blue-600">Query executed. {String(result.message) ? `: ${String(result.message)}` : ''}.</div>
    }
}

type SelectResultTableProps = {
    rows: Array<Record<string, unknown>>
}

const SelectResultTable = ({ rows }: SelectResultTableProps) => {
    if (rows.length === 0) return <div className="text-gray-500">Không có kết quả</div>

    const columns = Object.keys(rows[0])

    const formatValue = (value: unknown): string => {
        if (value === null || value === undefined) return 'null'
        if (typeof value === 'object') return JSON.stringify(value)
        return String(value)
    }

    return (
        <div className="w-full overflow-auto">
            <table className=" border border-gray-300 text-sm overflow-auto">
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th key={col} className="border px-2 py-1 text-left">{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, idx) => (
                        <tr key={idx}>
                            {columns.map(col => (
                                <td key={col} className="border px-2 py-1">
                                    {formatValue(row[col])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

