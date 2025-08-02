import axiosInstance from "./axiosInstance";
import { Book } from "../types/Book";

const bookApi = {
    getBooks: async (): Promise<Book[]> => {
        const res = await axiosInstance.get('/Books')
        return res.data
    },
    getBookById: async (id: number): Promise<Book> => {
        const res = await axiosInstance.get(`/Books/${id}`)
        return res.data
    },
    createBook: async (book: Omit<Book, 'id'>): Promise<Book> => {
        const res = await axiosInstance.post('/Books', book)
        return res.data
    },
    updateBook: async (id: number, book: Partial<Book>): Promise<Book> => {
        const res = await axiosInstance.put(`/Books/${id}`, book)
        return res.data
    },
    deleteBook: async (id: number): Promise<void> => {
        const response = await axiosInstance.delete(`/Books/${id}`);
        return response.data;
    },
};

export default bookApi;
