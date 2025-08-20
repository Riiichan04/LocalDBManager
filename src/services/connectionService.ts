import { DatabaseConnection } from "@/types/Connection";
import axios from "axios";

export async function getConnection() {
    const res = await axios.get('/api/connections')
    return res.data
}

export async function createAndSaveNewConnection(config: DatabaseConnection) {
    const res = await axios.post('/api/connections', config, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.data
}

export async function deleteConnection(connectionIndex: number) {
    const res = await axios.delete('/api/connections', {
        data: connectionIndex,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.data
}

export async function updateConnection(updateInfo: DatabaseConnection, index: number) {
    const res = await axios.put('/api/connections', { connection: updateInfo, updateIndex: index }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.data
}