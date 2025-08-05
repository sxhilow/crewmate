import API from "./axios.js"

export const completeProfile = async(userData) => {
    try {
        const res = await API.patch('/user/complete-profile', userData)
        return res.data
    } catch (error) {
        console.error("Error: ", error.response?.data || error.message)
        throw error;
    }
}