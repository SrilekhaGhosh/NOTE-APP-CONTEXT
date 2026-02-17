import axios from 'axios'
import React, { use } from 'react'
import toast from 'react-hot-toast';
import { useTodo } from './context/TodoContext';
// import toast from 'react-hot-toast'

export default function DeleteModal({ setDelModel, todoId }) {



    const { deleteTodo } = useTodo()

    const handleDelete = () => {
        deleteTodo(todoId)
        setDelModel(false)
    }

    return (
        <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">

            <div
                aria-hidden="true"
                className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"
                onClick={() => setDelModel(false)}
            ></div>


            <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
                <div className="w-full py-2 bg-white cursor-default pointer-events-auto dark:bg-gray-800 relative rounded-xl mx-auto max-w-sm">

                    <div className="space-y-2 p-2">
                        <div className="p-4 space-y-2 text-center dark:text-white">
                            <h2 className="text-xl font-bold tracking-tight">
                                Delete Todo
                            </h2>
                            <p className="text-gray-500">
                                Are you sure you would like to delete this note?
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div
                            aria-hidden="true"
                            className="border-t dark:border-gray-700 px-2"
                        />

                        <div className="px-6 py-2">
                            <div className="grid gap-2 grid-cols-2">
                                <button
                                    type="button"
                                    onClick={() => setDelModel(false)}
                                    className="inline-flex items-center justify-center py-1 font-medium rounded-lg border transition min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="inline-flex items-center justify-center py-1 font-medium rounded-lg transition min-h-[2.25rem] px-4 text-sm text-white bg-red-600 hover:bg-red-500"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
