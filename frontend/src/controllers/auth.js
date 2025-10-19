import API from "./axios"

export const fetchMe = async () => {
    try {
        const res = await API.get("/auth/me");
        return res.data
    } catch (error) {
        console.error("Error: ", error.response?.data || error.message)
        throw error;
    }
}

// export const googleLogin = () => {
//     window.location.href = 'http://localhost:3000/api/v1/auth/google'
// }

// export const githubLogin = () => {
//     window.location.href = 'http://localhost:3000/api/v1/auth/github'
// }

export const microsoftLogin = () => {
    window.location.href = 'http://localhost:3000/api/v1/auth/microsoft'
}