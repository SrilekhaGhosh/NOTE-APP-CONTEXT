/* eslint-disable react-refresh/only-export-components */
import { api } from "../../api/apiClient";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [flag, setFlag] = useState(false);


  const getAll = async () => {
    try {
      const res = await api.get("/todo/getAll");

      console.log("Fetched todos:", res);
      setTodos(res.data.todoData || res.data);

    } catch (error) {
      console.log("Data Not Found", error)
    }
  }

  const handleTodo = async (title, description = "Null") => {
    const data = {
      title,
      description,
    };

    try {
      const res = await api.post("/todo/create", data);

      console.log(res);
    
      toast.success("Note Added Successfully");

      setTitle("");
      setDescription("");
      setFlag((prev) => !prev);
    } catch (error) {
      console.log("Data Not Created", error);

      toast.error(error.response?.data?.errors?.[0] || "Failed to create note")


    }
  };
  const deleteTodo = async (todoId) => {
    try {
      const res = await api.delete(`/todo/delete/${todoId}`);

      console.log(res);
      getAll();
      toast.success(res.data.message)

    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message || "Failed to delete todo");
    }
  };




  const getTodo = async (id, setValue) => {
    try {
      const res = await api.get(`/todo/getById/${id}`)

      console.log("Fetched todo:", res.data)
      const { title, description } = res.data.data
      setValue("title", title)
      setValue("description", description)

    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch todo")
    }
  }


  const updateTodo = async (data, id) => {
    try {
      await api.put(`/todo/update/${id}`, data)

      toast.success("Note updated successfully")
      getAll()
      setFlag((prev) => !prev)
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.errors?.[0] || "Failed to update note")
    }
  }

  useEffect(() => {
    
    getAll()
  }, [flag])

  return (
    <TodoContext.Provider value={{
      title,
      setTitle,
      description,
      setDescription,
      todos,
      handleTodo,
      deleteTodo,
      updateTodo,
      getTodo
    }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodo = () => useContext(TodoContext)