"use client"

import { EditorTheme } from "@/types/EditorTheme"
import { oneDark } from "@codemirror/theme-one-dark"
import { Compartment, EditorState } from '@codemirror/state'
import { sql } from '@codemirror/lang-sql'
import { basicSetup, EditorView } from "codemirror"
import { useEffect, useRef } from "react"

type SqlEditorProps = {
    currentTheme: EditorTheme,
}

export default function SqlEditor({ currentTheme }: SqlEditorProps) {
    const editorRef = useRef<HTMLDivElement | null>(null)
    const viewRef = useRef<EditorView | null>(null)
    const themeCompartmentRef = useRef(new Compartment())

    useEffect(() => {
        const listEditorTheme = {
            [EditorTheme.DEFAULT]: [],
            [EditorTheme.ONEDARK]: [oneDark]
        }

        //If already created, jsut update theme
        if (viewRef.current) {
            const editorTheme = listEditorTheme[currentTheme]
            viewRef.current.dispatch({
                effects: themeCompartmentRef.current.reconfigure(editorTheme)
            })
            return
        }

        //Create editor in first time render
        if (!editorRef.current) return

        const rect = editorRef.current.getBoundingClientRect()
        const top = rect.top
        const height = window.innerHeight - top
        const lineHeight = 16
        const lineCount = Math.round(height / lineHeight) - 1
        const defaultText = '' + Array(lineCount).fill('').join('\n')

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
        requestAnimationFrame(() => view.requestMeasure())
    }, [currentTheme])

    return (
        <div ref={editorRef} className="editor p-0"></div>
    )
}