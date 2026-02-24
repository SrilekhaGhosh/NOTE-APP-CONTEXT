import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainSection from "../components/MainSection";
import { useTodo } from "../components/context/TodoContext";

const Home = () => {
  const { title, setTitle, description, setDescription, handleTodo, todos } = useTodo()


  const handleSubmit = (e) => {
    e.preventDefault();
    handleTodo(title, description);
  };


  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Welcome back</p>
              <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
                Capture ideas. Keep them organized.
              </h2>
              <p className="text-white/80 mt-2 max-w-2xl">
                Write quick notes, update them anytime, and keep everything in one place.
              </p>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 w-fit">
              <p className="text-white/80 text-xs">Total notes</p>
              <p className="text-white text-2xl font-bold">
                {Array.isArray(todos) ? todos.length : 0}
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Create */}
          <section className="lg:col-span-4">
            <div className="bg-white shadow-lg rounded-2xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Add a new note</h3>
                <span className="text-xs text-slate-500">Quick add</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Grocery list"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    placeholder="Write your note details..."
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    rows="5"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 resize-none outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Add Note
                </button>

                <p className="text-xs text-slate-500">
                  Tip: Keep titles short so notes are easy to scan.
                </p>
              </form>
            </div>
          </section>

          {/* Notes */}
          <section className="lg:col-span-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Your notes</h3>
              <div className="text-sm text-slate-600">
                {Array.isArray(todos) ? `${todos.length} total` : "0 total"}
              </div>
            </div>

            {Array.isArray(todos) && todos.length > 0 ? (
              <MainSection todos={todos} />
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
                <p className="text-slate-900 font-semibold">No notes yet</p>
                <p className="text-slate-600 mt-1">Create your first note using the form.</p>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
