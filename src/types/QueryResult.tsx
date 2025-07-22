export type QueryResult =
    | { type: 'SELECT'; rows: Array<Record<string, unknown>>; executeTime: number }
    | { type: 'INSERT'; insertId: number; affectedRows: number; executeTime: number }
    | { type: 'UPDATE' | 'DELETE'; affectedRows: number; executeTime: number }
    | { type: 'OTHER'; message?: string; executeTime: number }
    | { type: 'ERROR'; message?: string; executeTime: 0 }