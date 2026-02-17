import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { useTodo } from './context/TodoContext'

const UpdateModal = () => {
  const { register, handleSubmit, setValue } = useForm()
  const { id } = useParams()
  const navigate = useNavigate()
  const { updateTodo, getTodo } = useTodo()

  const handleCancel = () => navigate("/Home")

  const onSubmit = (data) => {
    updateTodo(data, id)
    navigate("/Home")
  }

  useEffect(() => {
    if (id) {
      getTodo(id, setValue)
    }

  }, [id])

  return (
    <div className="min-h-screen flex justify-center mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
        <div className="bg-white shadow-xl rounded-xl p-6 border">


          <h2 className="text-center text-xl font-semibold mb-4 flex justify-center items-center gap-2">
            ✏️ Update Note
          </h2>


          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            className="w-full mb-4 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />


          <textarea
            rows="4"
            placeholder="Description"
            {...register("description")}
            className="w-full mb-6 rounded-md border border-gray-300 px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />


          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Update Note
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>

        </div>
      </form>
    </div>
  )
}

export default UpdateModal
