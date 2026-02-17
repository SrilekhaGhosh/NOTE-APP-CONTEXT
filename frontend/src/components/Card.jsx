




import React from "react";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { SlNote } from "react-icons/sl";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

const Card = ({ title, description, id, getAll }) => {

  const [delModel, setDelModel] = useState(false)
  const [todoId, setTodoId] = useState();
  return (
    <div className="bg-white border rounded-xl shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition">


      <h3 className="text-lg font-semibold text-gray-800 mb-2 break-words">
        {title}
      </h3>


      <p className="text-gray-600 text-sm mb-4 break-words">
        {description}
      </p>


      <div className="flex justify-end gap-3 mt-auto">
        <MdDeleteOutline className="  size-6 cursor-pointer  hover:text-red-600" onClick={() => { setDelModel(true); setTodoId(id) }} />


        <Link to={`/update/${id}`}>
          <SlNote className="size-5 cursor-pointer  hover:text-blue-600" />

        </Link>
      </div>
      {delModel && <DeleteModal delModel={delModel} setDelModel={setDelModel} todoId={todoId} getAll={getAll} />}
    </div>
  );
};

export default Card;

