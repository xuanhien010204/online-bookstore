import axiosInstance from "../../api/axiosInstance";

export const login = async (data: { email: string, password: string }) => {
    const res = await axiosInstance.post("/Auth/login", data);
    return res.data;
};