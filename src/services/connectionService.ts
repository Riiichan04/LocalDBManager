import axios from "axios";

export async function getConnection() {
    const res = await axios.get('/api/connections')
    return res.data
}