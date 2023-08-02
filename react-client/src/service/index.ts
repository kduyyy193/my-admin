import axios from "axios";
import { IUser } from "../common/interface";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { axiosInstance }

const ServicePage = {
    signup: async ({ name, email, password, password_confirmation }: IUser) => {
        try {
            const res = await axiosInstance.post("/signup", {
                name,
                email,
                password,
                password_confirmation,
            });
            return res.data;
        } catch (error) {
            return error;
        }
    },
    signin: async ({ email, password }: IUser) => {
        try {
            const res = await axiosInstance.post("/login", {
                email,
                password,
            });
            return res.data;
        } catch (error) {
            return error;
        }
    },
    logout: async () => {
        try {
            const res = await axiosInstance.post("/logout");
            return res;
        } catch (error) {
            return error;
        }
    },
    getUsers: async () => {
        try {
            const res = await axiosInstance.get("/users");
            return res;
        } catch (error) {
            return error;
        }
    },
    getUser: async (id: string) => {
        try {
            const res = await axiosInstance.get(`/users/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    },
    addUser: async (user: IUser) => {
        try {
            const res = await axiosInstance.post(`/users`, user);
            return res;
        } catch (error) {
            return error;
        }
    },
    updateUser: async (user: IUser,) => {
        try {
            const res = await axiosInstance.put(`/users/${user.id}`, user);
            return res;
        } catch (error) {
            return error;
        }
    },
    deleteUser: async (id: string) => {
        try {
            const res = await axiosInstance.delete(`/users/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }
};

export default ServicePage;
