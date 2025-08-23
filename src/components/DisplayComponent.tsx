import { FeatureType } from "@/types/FeatureType"
import SqlEditor from "./SqlEditor"
import { EditorTheme } from "@/types/EditorTheme"
import TableComponent from "./TableComponent"
import ManageConnection from "./ManageConnection"
import { DatabaseConnection } from "@/types/Connection"
import { QueryResult } from "@/types/QueryResult"
import DatabaseIndexComponent from "./DatabaseIndexComponent"
import ComingSoon from "./ComingSoon"
import DatabaseTriggerComponent from "./DatabaseTriggerComponent"
import DatabaseFunctionComponent from "./DatabaseFunctionComponent"
import DatabaseViewComponent from "./DatabaseViewComponent"
import DatabaseUserComponent from "./DatabaseUserComponent"

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