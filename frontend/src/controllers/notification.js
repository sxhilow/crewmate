import API from './axios'

export const getAllNotifications = async () => {
    try {
        const res = await API.get('/notification/')
        return res.data
    } catch (error) {
        console.error("Error: ", error.response?.data || error.message)
        throw error;
    }
}