
import express from "express"
import { createTodo, deleteTodo, getAllTodo,  getTodoById,  updateTodo } from "../controllers/todoController.js"
import { hasToken } from "../middleware/hasToken.js"
import { todoValidateSchema, validateTodo } from "../validators/todoValidate.js"



const todoRoute = express.Router()

todoRoute.post("/create", hasToken,validateTodo(todoValidateSchema), createTodo)
todoRoute.get("/getAll", hasToken, getAllTodo)
todoRoute.get("/getById/:id", getTodoById);
todoRoute.delete("/delete/:id", hasToken, deleteTodo)
todoRoute.put("/update/:id", hasToken,validateTodo(todoValidateSchema), updateTodo)


export default todoRoute

