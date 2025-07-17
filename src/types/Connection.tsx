export type DatabaseConnection = {
    name: string,
    host: string,
    username: string,
    password: string,
    port: number
}

export type DatabaseTableDetail = {
    connection: DatabaseConnection,
    databaseName: string
}

export type TableDetail = {
    connection: DatabaseConnection,
    databaseName: string,
    tableName: string
}

export type FieldDetail = {
    fieldName: string,
    fieldType: string
}
