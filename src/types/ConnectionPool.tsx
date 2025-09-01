import { Pool } from "mysql2/promise"

interface PoolDetail {
    pool: Pool
    lastUsed: number
}

class ConnectionManager {
    private static instance: ConnectionManager
    private pools: Map<string, PoolDetail> = new Map()
    private readonly TTL = 60000 //10 mins

    private constructor() {
    }

    public static getInstance(): ConnectionManager {
        if (!ConnectionManager.instance) {
            ConnectionManager.instance = new ConnectionManager()
        }
        return ConnectionManager.instance
    }
}