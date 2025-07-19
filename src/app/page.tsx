"use client"

import DisplayComponent from "@/components/DisplayComponent";
import DisplayFeatureBar from "@/components/DisplayFeatureBar";
import FeatureBar from "@/components/FeatureBar";
import MenuBar from "@/components/MenuBar";
import { useClientValue } from "@/hooks/useClientValues";
import { DatabaseConnection } from "@/types/Connection";
import { EditorTheme } from "@/types/EditorTheme";
import { FeatureType, MenuBarType } from "@/types/FeatureType";
import { useState } from "react";

export default function Home() {
    const [currentFeature, setCurrentFeature] = useState(FeatureType.NONE)
    const [currentMenuFeature, setMenuFeature] = useState(MenuBarType.HOME)
    const [currentConnection, setCurrentConnection] = useState<DatabaseConnection | null>(null)
    const [currentEditorTheme, setCurrentEditorTheme] = useState(
        useClientValue(() => localStorage.getItem('editor-theme') || "default", "default") === "default" ? EditorTheme.DEFAULT : EditorTheme.ONEDARK
    )

    const updateCurrentFeature = (feature: FeatureType) => {
        setCurrentFeature(feature)
    }

    const updateMenuBarFeature = (menuIndex: MenuBarType) => {
        setMenuFeature(menuIndex)
    }

    const updateEditorTheme = (theme: EditorTheme) => {
        setCurrentEditorTheme(theme)
    }

    const updateCurrentConnection = (newConnection: DatabaseConnection) => {
        setCurrentConnection(newConnection)
    }

    const featureBarProps = {
        currentComponent: currentFeature,
        editorTheme: currentEditorTheme,
        updateEditorTheme: updateEditorTheme,
        currentConnection: currentConnection,
        updateCurrentConnection: updateCurrentConnection
    }

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-2">
                <MenuBar currentMenuBarFeature={currentMenuFeature} updateCurrentMenuBarFeature={updateMenuBarFeature} />
            </div>
            {currentMenuFeature === MenuBarType.CONNECTION &&
                <div className="flex flex-col h-screen col-span-10">
                    <FeatureBar currentFeature={currentFeature} setCurrentFeature={updateCurrentFeature} />
                    <DisplayFeatureBar {...featureBarProps} />
                    <div className="flex-1" style={{ overflow: 'auto' }}>
                        <DisplayComponent currentConnection={currentConnection} currentComponent={currentFeature} currentEditorTheme={currentEditorTheme} />
                    </div>
                </div>
            }
        </div>



    )
}