import { FeatureType } from "@/types/FeatureType"
import SqlEditor from "./connections/SqlEditorComponent"
import { EditorTheme } from "@/types/EditorTheme"
import TableComponent from "./connections/TableComponent"
import ManageConnection from "./connections/ManageConnectionComponent"
import { DatabaseConnection } from "@/types/Connection"
import { QueryResult } from "@/types/QueryResult"
import DatabaseIndexComponent from "./connections/DatabaseIndexComponent"
import ComingSoon from "./ComingSoon"
import DatabaseTriggerComponent from "./connections/DatabaseTriggerComponent"
import DatabaseFunctionComponent from "./connections/DatabaseFunctionComponent"
import DatabaseViewComponent from "./connections/DatabaseViewComponent"
import DatabaseUserComponent from "./connections/DatabaseUserComponent"

type DisplayComponentProps = {
    currentComponent: FeatureType,
    currentEditorTheme: EditorTheme,
    currentConnection: DatabaseConnection | null,
    queryResult: { result: QueryResult; query: string } | null,
    onGetCurrentQuery: (getQuery: () => string) => void
}

export default function DisplayComponent(props: DisplayComponentProps) {
    const listComponent = {
        [FeatureType.NONE]: <ComingSoon />,
        [FeatureType.MANAGE]: <ManageConnection />,
        [FeatureType.QUERY]: <SqlEditor onGetCurrentQuery={props.onGetCurrentQuery} queryResult={props.queryResult} currentTheme={props.currentEditorTheme} />,
        [FeatureType.TABLE]: <TableComponent currentConnection={props.currentConnection} />,
        [FeatureType.INDEX]: <DatabaseIndexComponent currentConnection={props.currentConnection} />,
        [FeatureType.VIEW]: <DatabaseViewComponent currentConnection={props.currentConnection} />,
        [FeatureType.FUNCTION]: <DatabaseFunctionComponent currentConnection={props.currentConnection} />,
        [FeatureType.USER]: <DatabaseUserComponent currentConnection={props.currentConnection} />,
        [FeatureType.TRIGGER]: <DatabaseTriggerComponent currentConnection={props.currentConnection} />,
    }

    return listComponent[props.currentComponent]
}