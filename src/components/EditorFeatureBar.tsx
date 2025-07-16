import { EditorTheme } from '@/types/EditorTheme';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

type EditorFeatureBarProps = {
    editorTheme: EditorTheme,
    updateEditorTheme: (editorTheme: EditorTheme) => void
}

export default function EditorFeatureBar({ editorTheme, updateEditorTheme }: EditorFeatureBarProps) {
    const updateEditorThemeHandler = () => {
        const theme = editorTheme === EditorTheme.DEFAULT ? EditorTheme.ONEDARK : EditorTheme.DEFAULT
        localStorage.setItem("editor-theme", theme)
        updateEditorTheme(theme)
    }

    return (
        <div className="grid grid-cols-12 gap-4 p-2 border-t border-b">
            <div className="col-span-2 flex justify-center">
                <input className="border rounded p-1 px-2" type="text" placeholder="Chọn một Connection" />
            </div>
            <div className="col-span-2 flex justify-center">
                <input className="border rounded p-1 px-2" type="text" placeholder="Chọn một Database" />
            </div>
            <div className="col-span-2">
                <button className="border text-button p-1 px-2 rounded flex content-center">
                    <PlayArrowRoundedIcon className="pe-1" />
                    Chạy
                </button>
            </div>
            <div className="col"></div>
            <div className="col-span-2">
                <button className="main-cta-button p-1 px-2 rounded flex content-center"
                    onClick={updateEditorThemeHandler}
                >
                    <ColorLensRoundedIcon className="pe-1" />
                    Theme: {editorTheme === EditorTheme.DEFAULT ? "Default" : "One Dark"}
                </button>
            </div>
        </div>
    )
}