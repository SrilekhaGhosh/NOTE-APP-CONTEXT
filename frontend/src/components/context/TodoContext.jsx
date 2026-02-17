/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
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
      const accessToken = localStorage.getItem("accessToken");
      console.log("Using token in home:", accessToken);

      const res = await axios.get(
        "http://localhost:8001/todo/getAll",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

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

    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await axios.post(
        "http://localhost:8001/todo/create",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(res);
    
      toast.success("Note Added Successfully");

      setTitle("");
      setDescription("");
      setFlag((prev) => !prev);
    } catch (error) {
      console.log("Data Not Created", error);
  
      toast.error(error.response.data.errors[0])


    }
  };
  const deleteTodo = async (todoId) => {
    try {

      const token = localStorage.getItem("accessToken");

      const res = await axios.delete(
        `http://localhost:8001/todo/delete/${todoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

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
      const token = localStorage.getItem("accessToken")
      const res = await axios.get(
        `http://localhost:8001/todo/getById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

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
      const token = localStorage.getItem("accessToken")
      await axios.put(
        `http://localhost:8001/todo/update/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

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