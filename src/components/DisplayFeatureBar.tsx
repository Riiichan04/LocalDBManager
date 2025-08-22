"use client"

import { FeatureType } from "@/types/FeatureType"
import EditorFeatureBar from "./feature_bars/EditorFeatureBar"
import { EditorTheme } from "@/types/EditorTheme"
import TableFeatureBar from "./feature_bars/TableFeatureBar"
import { DatabaseConnection } from "@/types/Connection"
import { QueryResult } from "@/types/QueryResult"
import { RefObject } from "react"
import ManageConnectionFeatureBar from "./feature_bars/ManageConnectionFeatureBar"
import DatabaseIndexFeatureBar from "./feature_bars/DatabaseIndexFeatureBar"

type DisplayFeatureBarProps = {
    currentComponent: FeatureType,
    editorTheme: EditorTheme,
    updateEditorTheme: (editorTheme: EditorTheme) => void,
    currentConnection: DatabaseConnection | null,
    updateCurrentConnection: (newConnection: DatabaseConnection) => void,
    updateAddNewConnectionForm: () => void,
    getCurrentQueryRef: RefObject<() => string>
    currentQuery: string,   ///Will be removed
    updateCurrentQuery: (query: string) => void,
    updateQueryResult: (queryResult: { result: QueryResult; query: string } | null) => void,
}

export default function DisplayFeatureBar(props: DisplayFeatureBarProps) {
    const editorFeatureBarProps = {
        currentQuery: props.currentQuery,
        editorTheme: props.editorTheme,
        updateEditorTheme: props.updateEditorTheme,
        currentConnection: props.currentConnection,
        setCurrentConnection: props.updateCurrentConnection,
        updateCurrentQuery: props.updateCurrentQuery,
        updateQueryResult: props.updateQueryResult,
        getCurrentQueryRef: props.getCurrentQueryRef
    }


    const listComponent = {
        [FeatureType.NONE]: <></>,
        [FeatureType.MANAGE]: <ManageConnectionFeatureBar updateAddNewConnectionForm={props.updateAddNewConnectionForm} />,
        [FeatureType.QUERY]: <EditorFeatureBar {...editorFeatureBarProps} />,
        [FeatureType.TABLE]: <TableFeatureBar updateAddNewConnectionForm={props.updateAddNewConnectionForm} currentConnection={props.currentConnection} setCurrentConnection={props.updateCurrentConnection} />,
        [FeatureType.INDEX]: <DatabaseIndexFeatureBar updateAddNewConnectionForm={props.updateAddNewConnectionForm} currentConnection={props.currentConnection} setCurrentConnection={props.updateCurrentConnection} />,
        [FeatureType.VIEW]: <></>,
        [FeatureType.FUNCTION]: <></>,
        [FeatureType.USER]: <></>,
        [FeatureType.TRIGGER]: <></>,
    }

    return listComponent[props.currentComponent]
}