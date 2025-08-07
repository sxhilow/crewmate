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

export const fetchUserProfile = async () => {
    try {
        const res = await API.get('/user/me');
        return res.data
    } catch (error) {
        console.error("Error: ", error.response?.data || error.message)
        throw error;
    }
}

export const editUserProfile = async (userData) => {
    try {
        const res = await API.patch("/user/edit-profile", userData)
        return res.data
    } catch (error) {
        console.error("Error: ", error.response?.data || error.message)
        throw error;
    }
}