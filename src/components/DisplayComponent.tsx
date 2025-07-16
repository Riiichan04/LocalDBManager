import { FeatureType } from "@/types/FeatureType"
import SqlEditor from "./SqlEditor"
import { EditorTheme } from "@/types/EditorTheme"
import TableComponent from "./TableComponent"

type DisplayComponentProps = {
    currentComponent: FeatureType,
    currentEditorTheme: EditorTheme,
}

export default function DisplayComponent({ currentComponent, currentEditorTheme }: DisplayComponentProps) {
    const listComponent = {
        [FeatureType.HOME]: <></>,
        [FeatureType.CONNECTION]: <></>,
        [FeatureType.QUERY]: <SqlEditor currentTheme={currentEditorTheme} />,
        [FeatureType.TABLE]: <TableComponent />,
        [FeatureType.INDEX]: <></>,
        [FeatureType.VIEW]: <></>,
        [FeatureType.FUNCTION]: <></>,
        [FeatureType.USER]: <></>,
        [FeatureType.TRIGGER]: <></>,
    }

    return listComponent[currentComponent]
}