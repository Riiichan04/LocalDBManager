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