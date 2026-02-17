// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import MainSection from "../components/MainSection";

// const Home = () => {
//     const [todos, setTodos] = useState([]);
//     const[title,setTitle]=useState("");
//     const[description,setDescription]=useState("");
//       const[flag, setFlag]=useState(false);
//     const getAll = async () => {
//         try {

//             const accessToken = localStorage.getItem("accessToken");
//             console.log("Using token in home:", accessToken);
//             const res = await axios.get("http://localhost:7001/todo/getAll", {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             });

//             console.log("Fetched todos:", res);
//             setTodos(res.data.todoData || res.data);
//         } catch (error) {
//             console.log("Error fetching todos:", error.response || error);
//         }
//     };
    
//       const handleSubmit = (e) => {
//     e.preventDefault();

    


//    const handleTodo = async (title,description="Null") => {
//         const data = {
//             "title": title,
//             "description": description
//         }
//           const accessToken = localStorage.getItem("accessToken");
//         try {
           
//             const res = await axios.post(`http://localhost:7001/todo/create`, data,{
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             })
//             console.log(res)
           
//            setFlag(flag => !flag);
//             alert("Note Added Successfully")
            
//             setTitle('')
//             setDescription('')

//         } catch (error) {
//             console.log("Data Not Created",error)
//             alert(error.response?.data?.message || "Failed to add note")
//             // toast.error(error.response.data.errors || error.response.data.message)
//             setTitle("")
//             setDescription("")
//         }
//     }

//       }




//     useEffect(() => {
//         getAll();
//     }, [flag]);

//     return (
//         <div>
//             <Header />

//             {/* <div> */}
//            {/* <input type="text"  placeholder="write your title here" value={title} onChange={(e) => setTitle(e.target.value)} />
//            <input type="text"  placeholder="write your description here" value={description} onChange={(e) => setDescription(e.target.value)} />
//            <button className="p-3 bg-slate-700 m-3 text-white rounded-lg" onClick={() => handleTodo(title,description)}>add</button>
//             </div> */}
//              <div className="max-w-md mx-auto mt-10 bg-white shadow-xl rounded-xl p-6 border">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">
//         📝 Add Note
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Title */}
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           required
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         {/* Description */}
//         <textarea
//           placeholder="Description"
//           value={description}
//           required
//           onChange={(e) => setDescription(e.target.value)}
//           rows="4"
//            className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         {/* Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
//         >
//           Add Note
//         </button>
//       </form>
//     </div>

//             <MainSection todos={todos} />
//             <Footer />

//         </div>
//     );
// };

// export default Home;
import axios from "axios";
import React, {  useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainSection from "../components/MainSection";
import toast from "react-hot-toast";
import { useTodo } from "../components/context/TodoContext";

const Home = () => {
  // const [todos, setTodos] = useState([]);
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [flag, setFlag] = useState(false);
     const { title, setTitle, description, setDescription, handleTodo, todos } = useTodo()

 
  // const getAll = async () => {
  //   try {
  //     const accessToken = localStorage.getItem("accessToken");
  //     console.log("Using token in home:", accessToken);

  //     const res = await axios.get(
  //       "http://localhost:7001/todo/getAll",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );

  //     console.log("Fetched todos:", res);
  //     setTodos(res.data.todoData || res.data);
  //   } catch (error) {
  //     console.log("Error fetching todos:", error.response || error);
  //   }
  // };

  
  // const handleTodo = async (title, description = "Null") => {
  //   const data = {
  //     title,
  //     description,
  //   };

  //   const accessToken = localStorage.getItem("accessToken");

  //   try {
  //     const res = await axios.post(
  //       "http://localhost:7001/todo/create",
  //       data,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );

  //     console.log(res);
  //   //   alert("Note Added Successfully");
  //   toast.success("Note Added Successfully");

  //     setTitle("");
  //     setDescription("");
  //     setFlag((prev) => !prev);
  //   } catch (error) {
  //     console.log("Data Not Created", error);
  //       //   toast.error(error.response?.data?.message || "Failed to add note");
  //       toast.error(error.response.data.errors[0])

    
  //   }
  // };


  const handleSubmit = (e) => {
    e.preventDefault();
    handleTodo(title, description);
  };


  return (
    <div>
      <Header />

     
      <div className="max-w-md mx-auto mt-3 bg-white shadow-xl rounded-xl p-6 border">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          📝 Add Note
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <textarea
            placeholder="Description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            Add Note
          </button>
        </form>
      </div>

      <MainSection todos={todos}  />
      <Footer />
    </div>
  );
};

export default Home;
