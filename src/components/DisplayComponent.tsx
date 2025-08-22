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
        [FeatureType.VIEW]: <ComingSoon />,
        [FeatureType.FUNCTION]: <ComingSoon />,
        [FeatureType.USER]: <ComingSoon />,
        [FeatureType.TRIGGER]: <DatabaseTriggerComponent currentConnection={props.currentConnection} />,
    }

    return listComponent[props.currentComponent]
}