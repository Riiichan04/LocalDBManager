import { getConnection } from '@/services/connectionService';
import { fetchDatabase } from '@/services/databaseService';
import { executeQuery } from '@/services/queryService';
import { DatabaseConnection } from '@/types/Connection';
import { EditorTheme } from '@/types/EditorTheme';
import { QueryResult } from '@/types/QueryResult';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { RefObject, useEffect, useState } from 'react';

type EditorFeatureBarProps = {
    editorTheme: EditorTheme,
    updateEditorTheme: (editorTheme: EditorTheme) => void
    currentConnection: DatabaseConnection | null,
    setCurrentConnection: (newConnection: DatabaseConnection) => void,
    getCurrentQueryRef: RefObject<() => string>,
    currentQuery: string, //Will be removed
    updateCurrentQuery: (query: string) => void,
    updateQueryResult: (queryResult: { result: QueryResult; query: string } | null) => void,
}

export default function EditorFeatureBar(props: EditorFeatureBarProps) {
    const [listConnection, updateListConnection] = useState<DatabaseConnection[]>([])
    const [listDatabase, updateListDatabase] = useState<string[]>([])   //For database display
    const [currentDatabase, setCurrentDatabase] = useState<string | null>(null)

    const updateEditorThemeHandler = () => {
        const theme = props.editorTheme === EditorTheme.DEFAULT ? EditorTheme.ONEDARK : EditorTheme.DEFAULT
        localStorage.setItem("editor-theme", theme)
        props.updateEditorTheme(theme)
    }

    const changeConnection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        try {
            const connectionKey = event.target.value
            const connectionIndex = parseInt(connectionKey.substring(connectionKey.indexOf('_') + 1))
            props.setCurrentConnection(listConnection[connectionIndex])
        }
        catch (error: unknown) {
            //Temp, will be changed later
            console.log(error)
        }
    }

    //FIXME: Temp function, will be fixed later
    const getConnectionIndex = (connection: DatabaseConnection | null): string => {
        if (!connection) return "none"
        for (let i = 0; i < listConnection.length; i++) {
            if (listConnection[i].name === connection.name) return `connection_${i}`
        }
        return "none"
    }

    const runQuery = async () => {
        const query = props.getCurrentQueryRef.current()
        props.updateCurrentQuery(query)
        const connection = props.currentConnection
        if (connection && currentDatabase) {
            const result = await executeQuery(query, { connection: connection, databaseName: currentDatabase })
            props.updateQueryResult({ result, query })
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            //Fetch list connection
            if (listConnection.length === 0) {
                const result = await getConnection()
                updateListConnection(result.data)
            }

            //Get db data from connection
            if (props.currentConnection) {
                const listDbs = await fetchDatabase(props.currentConnection)
                updateListDatabase(listDbs)
            } else {
                updateListDatabase([]) //Clear if dont have connection
            }
        }

        fetchData()
    }, [props.currentConnection, listConnection.length])

    return (
        <div className="grid grid-cols-12 gap-4 p-2 border-b">
            <div className="col-span-2 flex justify-center">
                <select className="border rounded p-1 px-2" value={getConnectionIndex(props.currentConnection)} onChange={changeConnection}>
                    <option value={"none"} disabled >Chọn một connection</option>
                    {listConnection.length > 0 && listConnection.map((ele, index) => <option value={`connection_${index}`} key={`connection_${index}`}>{ele.name}</option>)}
                </select>
            </div>
            <div className="col-span-2 flex justify-center">
                <select className="border rounded p-1 px-2" value={currentDatabase ?? "none"} onChange={(e) => setCurrentDatabase(e.target.value)}>
                    <option value={"none"} disabled >Chọn một database</option>
                    {listDatabase.length > 0 && listDatabase.map((ele, index) => (
                        <option value={ele} key={`db_${index}`}>{ele}</option>
                    ))}
                </select>
            </div>
            <div className="col-span-2">
                <button className="cursor-pointer border text-button p-1 px-2 rounded flex content-center"
                    onClick={runQuery}
                >
                    <PlayArrowRoundedIcon className="pe-1" />
                    Chạy
                </button>
            </div>
            <div className="col"></div>
            <div className="col-span-2">
                <button className="cursor-pointer main-cta-button p-1 px-2 rounded flex content-center"
                    onClick={updateEditorThemeHandler}
                >
                    <ColorLensRoundedIcon className="pe-1" />
                    Theme: {props.editorTheme === EditorTheme.DEFAULT ? "Default" : "One Dark"}
                </button>
            </div>
        </div>
    )
}