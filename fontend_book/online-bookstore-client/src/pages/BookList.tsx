import { useEffect, useState } from "react"
import { Table, Popconfirm, message, Typography } from "antd"
import { ColumnsType } from "antd/es/table"
import bookApi from "../api/bookApi"
import { Book } from "../types/Book"

const { Title } = Typography

function BookList() {
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        fetchBooks()
    }, [])

    const fetchBooks = async () => {
        setLoading(true)
        try {
            const data = await bookApi.getBooks()
            setBooks(data)
        } catch (error) {
            message.error("Failed to fetch books.")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await bookApi.deleteBook(id)
            setBooks(prev => prev.filter(book => book.id !== id))
            message.success("Book deleted successfully")
        } catch (error) {
            message.error("Failed to delete book")
        }
    }

    const columns: ColumnsType<Book> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title"
        },
        {
            title: "Author",
            dataIndex: "author",
            key: "author"
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price: number) => `${price.toLocaleString()} đ`
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Popconfirm
                    title="Are you sure to delete this book?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <a style={{ color: "red" }}>Delete</a>
                </Popconfirm>
            )
        }
    ]

    return (
        <div style={{ padding: 24 }}>
            <Title level={2}>Book List</Title>
            <Table
                dataSource={books}
                columns={columns}
                rowKey="id"
                loading={loading}
                bordered
            />
        </div>
    )
}

export default BookList
