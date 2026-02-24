




import React from "react";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { SlNote } from "react-icons/sl";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

const Card = ({ title, description, id }) => {

  const [delModel, setDelModel] = useState(false)
  const [todoId, setTodoId] = useState();
  return (
    <div className="group bg-white border border-slate-200 rounded-2xl shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition">

      <div className="h-1 w-12 rounded-full bg-blue-600/80 mb-4" />


      <h3 className="text-lg font-semibold text-slate-900 mb-2 break-words">
        {title}
      </h3>


      <p className="text-slate-600 text-sm mb-5 break-words whitespace-pre-wrap">
        {description}
      </p>


      <div className="flex items-center justify-end gap-3 mt-auto">
        <button
          type="button"
          onClick={() => { setDelModel(true); setTodoId(id) }}
          className="p-2 rounded-lg hover:bg-red-50 text-slate-600 hover:text-red-600 transition"
          aria-label="Delete note"
        >
          <MdDeleteOutline className="size-6" />
        </button>


        <Link
          to={`/update/${id}`}
          className="p-2 rounded-lg hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition"
          aria-label="Edit note"
        >
          <SlNote className="size-5" />
        </Link>
      </div>

      {delModel && (
        <DeleteModal
          delModel={delModel}
          setDelModel={setDelModel}
          todoId={todoId}
        />
      )}
    </div>
  );
};

export default Card;

