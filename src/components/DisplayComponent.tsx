import { FeatureType } from "@/types/FeatureType"
import SqlEditor from "./SqlEditor"
import { EditorTheme } from "@/types/EditorTheme"
import TableComponent from "./TableComponent"
import { DatabaseConnection } from "@/types/Connection"

type DisplayComponentProps = {
    currentComponent: FeatureType,
    currentEditorTheme: EditorTheme,
    currentConnection: DatabaseConnection | null
}

export default function DisplayComponent({ currentComponent, currentEditorTheme, currentConnection }: DisplayComponentProps) {
    const listComponent = {
        [FeatureType.NONE]: <></>,
        [FeatureType.MANAGE]: <></>,
        [FeatureType.QUERY]: <SqlEditor currentTheme={currentEditorTheme} />,
        [FeatureType.TABLE]: <TableComponent currentConnection={currentConnection} />,
        [FeatureType.INDEX]: <></>,
        [FeatureType.VIEW]: <></>,
        [FeatureType.FUNCTION]: <></>,
        [FeatureType.USER]: <></>,
        [FeatureType.TRIGGER]: <></>,
    }

    return listComponent[currentComponent]
}