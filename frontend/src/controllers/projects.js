import API from "./axios";

export const getAllprojects = async (limit, offset) => {
    try {
        const res = await API.get(`/project?limit=${limit}&offset=${offset}`)
        return res.data
    } catch (error) {
        console.error("Error: ", error.response?.data || error.message)
        throw error;
    }
}

export const getProject = async (projectId) => {
    try {
        const res = await API.get(`/project/${projectId}`)
        return res.data
    } catch (error) {
        console.error("Error: ", error.response?.data || error.message)
        throw error;
    }
}

export const shareProject = async (projectData) => {
    try {
        console.log(projectData);
        
        const res = await API.post(`/project/add-project`, {projectData})
        return res.data
    } catch (error) {
        console.error("Error: ", error.response?.data || error.message)
        throw error;
    }
}

export const deleteProject = async (projectId) => {
    try {
        const res = await API.delete(`/project/delete-project/${projectId}`)
        return res.data
    } catch (error) {
        console.error("Error: ", error.response?.data || error.message)
        throw error;
    }
}

export const sendRequest = async (projectId) => {
    try {
        const res = await API.post(`/project/${projectId}/request`)
        return res.data
    } catch (error) {
        console.error("Error: ", error.response?.data || error.message)
        throw error;
    }
}

export const respondToRequest = async (projectId) => {
    try {
        const res = await API.patch(`/project/${projectId}/request`)
        return res.data
    } catch (error) {
        console.error("Error: ", error.response?.data || error.message)
        throw error;
    }
}

export const getAllRequests = async () => {
    try {
        const res = await API.get(`/project/requests`)
        return res.data
    } catch (error) {
        console.error("Error: ", error.response?.data || error.message)
        throw error;
    }
}