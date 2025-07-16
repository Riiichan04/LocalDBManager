"use client"

import { FeatureType } from "@/types/FeatureType"
import EditorFeatureBar from "./EditorFeatureBar"
import { EditorTheme } from "@/types/EditorTheme"

type DisplayFeatureBarProps = {
    currentComponent: FeatureType,
    editorTheme: EditorTheme,
    updateEditorTheme: (editorTheme: EditorTheme) => void
}

export default function DisplayFeatureBar({ currentComponent, editorTheme, updateEditorTheme }: DisplayFeatureBarProps) {
    const listComponent = {
        [FeatureType.HOME]: <></>,
        [FeatureType.CONNECTION]: <></>,
        [FeatureType.QUERY]: <EditorFeatureBar editorTheme={editorTheme} updateEditorTheme={updateEditorTheme} />,
        [FeatureType.TABLE]: <></>,
        [FeatureType.INDEX]: <></>,
        [FeatureType.VIEW]: <></>,
        [FeatureType.FUNCTION]: <></>,
        [FeatureType.USER]: <></>,
        [FeatureType.TRIGGER]: <></>,
    }

    return listComponent[currentComponent]
}