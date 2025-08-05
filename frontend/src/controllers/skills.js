import API from "./axios";

export const searchSkills = async(searchItem) => {
    try {
        const res = await API.get(`/skill?search=${searchItem}`)
        return res.data
    } catch (error) {
        console.error("Error: ", error.response?.data || error.message)
        throw error;
    }
}