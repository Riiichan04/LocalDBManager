"use client"

import AddNewConnectionForm from "@/components/AddNewConnectionForm";
import DisplayComponent from "@/components/DisplayComponent";
import DisplayFeatureBar from "@/components/DisplayFeatureBar";
import FeatureBar from "@/components/FeatureBar";
import MenuBar from "@/components/MenuBar";
import { useClientValue } from "@/hooks/useClientValues";
import { DatabaseConnection } from "@/types/Connection";
import { EditorTheme } from "@/types/EditorTheme";
import { FeatureType, MenuBarType } from "@/types/FeatureType";
import { QueryResult } from "@/types/QueryResult";
import { useRef, useState } from "react";

export default function Home() {
    const [addNewConnectionFormState, setAddNewConnectionForm] = useState(false)
    const [currentFeature, setCurrentFeature] = useState(FeatureType.NONE)
    const [currentMenuFeature, setMenuFeature] = useState(MenuBarType.HOME)
    const [currentConnection, setCurrentConnection] = useState<DatabaseConnection | null>(null)
    const [currentEditorTheme, setCurrentEditorTheme] = useState(
        useClientValue(() => localStorage.getItem('editor-theme') || "default", "default") === "default" ? EditorTheme.DEFAULT : EditorTheme.ONEDARK
    )
    const [currentQuery, setCurrentQuery] = useState<string>('')
    const [currentQueryResult, setCurrentQueryResult] = useState<{ result: QueryResult; query: string } | null>(null)

    const getCurrentQueryRef = useRef<() => string>(() => '')

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

    const updateAddNewForm = () => {
        setAddNewConnectionForm(!addNewConnectionFormState)
    }

    const updateCurrentQuery = (query: string) => {
        setCurrentQuery(query)
    }

    const updateQueryResult = (queryResult: { result: QueryResult; query: string } | null) => {
        setCurrentQueryResult(queryResult)
    }

    const featureBarProps = {
        currentComponent: currentFeature,
        editorTheme: currentEditorTheme,
        updateEditorTheme: updateEditorTheme,
        currentConnection: currentConnection,
        updateCurrentConnection: updateCurrentConnection,
        updateAddNewConnectionForm: updateAddNewForm,
        getCurrentQueryRef: getCurrentQueryRef,
        currentQuery: currentQuery,
        updateCurrentQuery: updateCurrentQuery,
        updateQueryResult: updateQueryResult,
    }

    const componentDisplayProp = {
        currentComponent: currentFeature,
        currentEditorTheme: currentEditorTheme,
        currentConnection: currentConnection,
        queryResult: currentQueryResult,
        onGetCurrentQuery: (getterFn: () => string) => {
            getCurrentQueryRef.current = getterFn
        }
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
                        <DisplayComponent {...componentDisplayProp} />
                    </div>
                </div>
            }
            {addNewConnectionFormState && <AddNewConnectionForm setDisplayAddNewConnectionForm={updateAddNewForm} />}
        </div>



    )
}