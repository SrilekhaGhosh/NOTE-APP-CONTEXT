
import todoSchema from "../models/todoSchema.js";





export const createTodo = async (req, res) => {
    try {
        const { title,description} = req.body
        const todoData = await todoSchema.create({ title,description,userId: req.userId })

        if (todoData) {
            return res.status(201).json({
                success: true,
                message: "Task Created",
                todoData
            })
        }
    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const getAllTodo = async (req, res) => {
    try {
        const todoData = await todoSchema.find({ userId: req.userId })
        if (todoData) {
            return res.status(200).json({
                success: true,
                message: "Todo Fetched Successfully",
                todoData
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const getTodoById = async (req, res) => {
  try {
    const todoId = req.params.id;
    const data = await todoSchema.findOne({ _id: todoId });
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Todo fetched successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id
        const todoData = await todoSchema.findByIdAndDelete({ _id: todoId, userId: req.userId })
        if (!todoData) {
            return res.status(400).json({
                success: true,
                message: "Todo Not Found",
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Todo deleted Successfully",
                todoData
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.id
        const { title, description } = req.body
        const todoData = await todoSchema.findOne({ _id: todoId, userId: req.userId })
        if (!todoData) {
            return res.status(400).json({
                success: true,
                message: "Todo Not Found",
            })
        }
        todoData.title = title
        todoData.description = description
        await todoData.save()
        return res.status(200).json({
            success: true,
            message: "Todo Updated Successfully",
            todoData
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
