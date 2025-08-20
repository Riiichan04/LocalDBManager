import { FeatureType } from "@/types/FeatureType"
import SqlEditor from "./SqlEditor"
import { EditorTheme } from "@/types/EditorTheme"
import TableComponent from "./TableComponent"
import ManageConnection from "./ManageConnection"
import { DatabaseConnection } from "@/types/Connection"
import { QueryResult } from "@/types/QueryResult"
import { useState } from "react"

type DisplayComponentProps = {
    currentComponent: FeatureType,
    currentEditorTheme: EditorTheme,
    currentConnection: DatabaseConnection | null,
    queryResult: { result: QueryResult; query: string } | null,
    onGetCurrentQuery: (getQuery: () => string) => void
}

export default function DisplayComponent(props: DisplayComponentProps) {
    const listComponent = {
        [FeatureType.NONE]: <></>,
        [FeatureType.MANAGE]: <ManageConnection />,
        [FeatureType.QUERY]: <SqlEditor onGetCurrentQuery={props.onGetCurrentQuery} queryResult={props.queryResult} currentTheme={props.currentEditorTheme} />,
        [FeatureType.TABLE]: <TableComponent currentConnection={props.currentConnection} />,
        [FeatureType.INDEX]: <></>,
        [FeatureType.VIEW]: <></>,
        [FeatureType.FUNCTION]: <></>,
        [FeatureType.USER]: <></>,
        [FeatureType.TRIGGER]: <></>,
    }

    return listComponent[props.currentComponent]
}