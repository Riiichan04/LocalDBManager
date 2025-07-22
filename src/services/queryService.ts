import axios from 'axios'
import { DatabaseTableDetail } from '@/types/Connection'
import { QueryResult } from '@/types/QueryResult'

export async function executeQuery(query: string, connection: DatabaseTableDetail): Promise<QueryResult> {
    const res = await axios.post<QueryResult>('/api/execute-query', {
        connection: connection,
        query: query,
    })
    return res.data
}
