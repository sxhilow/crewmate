import API from "./axios"

export const getAllTeams = async () => {
    try {
        const res = await API.get('/team')
        return res.data
    } catch (error) {
        console.error("Error: ", error.response?.data || error.message)
        throw error;
    }
}

export const getTeam = async (id) => {
    try {
        const res = await API.get(`/team/${id}`)
        return res.data
    } catch (error) {
        console.error("Error: ", error.response?.data || error.message)
        throw error;
    }
}

export const getTeamMessages = async (id) => {
    try {
        const res = await API.get(`/team/${id}/messages`)
        return res.data
    } catch (error) {
        console.error("Error: ", error.response?.data || error.message)
        throw error;
    }
}

export const sendTeamMessage = async (id, content) => {
    try {
        const res = await API.post(`/team/${id}/messages`, {content})
        return res.data
    } catch (error) {
        console.error("Error: ", error.response?.data || error.message)
        throw error;
    }
}