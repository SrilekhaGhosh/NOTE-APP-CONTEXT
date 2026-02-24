import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useTodo } from './context/TodoContext'
import Header from './Header'
import Footer from './Footer'

const UpdateModal = () => {
  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm()
  const { id } = useParams()
  const navigate = useNavigate()
  const { updateTodo, getTodo } = useTodo()

  const handleCancel = () => navigate("/home")

  const onSubmit = async (data) => {
    await updateTodo(data, id)
    navigate("/home")
  }

  useEffect(() => {
    if (id) {
      getTodo(id, setValue)
    }

  }, [id, getTodo, setValue])

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <p className="text-white/80 text-sm font-medium">Edit note</p>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
            Update your note
          </h2>
          <p className="text-white/80 mt-2 max-w-2xl">
            Make changes to your title and description, then save.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white shadow-lg rounded-2xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">✏️ Update Note</h3>
                <span className="text-xs text-slate-500">Keep it clear</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <input
                    type="text"
                    placeholder="Title"
                    {...register("title")}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    rows="6"
                    placeholder="Description"
                    {...register("description")}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 resize-none outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-70"
                >
                  {isSubmitting ? "Updating..." : "Update Note"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full bg-slate-100 text-slate-800 py-2.5 rounded-lg font-semibold hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default UpdateModal
