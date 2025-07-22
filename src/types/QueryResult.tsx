export type QueryResult =
    | { type: 'SELECT'; rows: Array<Record<string, unknown>> }
    | { type: 'INSERT'; insertId: number; affectedRows: number }
    | { type: 'UPDATE' | 'DELETE'; affectedRows: number }
    | { type: 'OTHER'; message?: string }
    | { type: 'ERROR'; message?: string }