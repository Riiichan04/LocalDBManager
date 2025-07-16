"use client"

import DisplayComponent from "@/components/DisplayComponent";
import DisplayFeatureBar from "@/components/DisplayFeatureBar";
import FeatureBar from "@/components/FeatureBar";
import { useClientValue } from "@/hooks/useClientValues";
import { EditorTheme } from "@/types/EditorTheme";
import { FeatureType } from "@/types/FeatureType";
import { useState } from "react";

export default function Home() {
    const [currentFeature, setCurrentFeature] = useState(FeatureType.HOME)

    const [currentEditorTheme, setCurrentEditorTheme] = useState(
        useClientValue(() => localStorage.getItem('editor-theme') || "default", "default") === "default" ? EditorTheme.DEFAULT : EditorTheme.ONEDARK
    )

    const updateCurrentFeature = (feature: FeatureType) => {
        setCurrentFeature(feature)
    }

    const updateEditorTheme = (theme: EditorTheme) => {
        setCurrentEditorTheme(theme)
    }

    return (
        <div className="flex flex-col h-screen">
            <FeatureBar currentFeature={currentFeature} setCurrentFeature={updateCurrentFeature} />
            <DisplayFeatureBar currentComponent={currentFeature} editorTheme={currentEditorTheme} updateEditorTheme={updateEditorTheme} />
            <div className="flex-1" style={{ overflow: 'auto' }}>
                <DisplayComponent currentComponent={currentFeature} currentEditorTheme={currentEditorTheme} />
            </div>
        </div>
    )
}