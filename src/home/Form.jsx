import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";

const Form = () => {
  // const [task, setTask] = useState("");
  // const [deadline, setDeadline] = useState("");
  // const [status, setStatus] = useState("");
  // const [note, setNote] = useState("");
  // const [todos, setTodos] = useState([]);
  return (
    <>
      <div className="flex flex-col items-center justify-center pt-20 bg-white">
        <div className="w-300 bg-white p-5 outline-1 outline-blue-400 rounded-2xl">
          <h2 className="flex items-center justify-center gap-4 font-inter text-4xl font-bold text-center ">
            <span className="text-green-400">
              <FaRegCheckCircle />
            </span>
            To-Do List
          </h2>
          <p className="text-center text-gray-500 mt-2">
            Keep track of your tasks and stay organized!
          </p>
          <form className="flex flex-col items-center justify-center mt-5">
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex items-center justify-between gap-4">
                <div className="w-1/2">
                  <p className="text-center font-semibold text-xl">
                    Task Description
                  </p>
                  <input
                    type="text"
                    placeholder="Task Description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="w-1/2">
                  <p className="text-center font-semibold text-xl">Deadline</p>
                  <input
                    type="date"
                    placeholder="Deadline"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
              <div className="w-full flex items-center justify-between gap-4">
                <div className="w-1/2">
                  <p className="text-center font-semibold text-xl">Status</p>
                  <select
                    id="task-status"
                    name="task-status"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select Status</option>
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <p className="text-center font-semibold text-xl">Notes</p>
                  <input
                    type="text"
                    placeholder="Notes"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-3">
              Add
            </button>
          </form>
        </div>
      </div>
      {/* table data  */}
      {/* <div className="flex items-center justify-center pt-10">
        <h2 className="text-2xl font-bold text-blue-300 mb-4">
          Your Tasks
        </h2>
      </div> */}
      <div className="w-300 bg-white pt-5 rounded-2xl m-auto">
        <table className="w-full table-auto border-collapse rounded-xl overflow-hidden shadow-md">
          <thead className="bg-gray-100 text-gray-600 text-left text-base font-semibold">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Task Description</th>
              <th className="px-4 py-3">Deadline</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Notes</th>
            </tr>
          </thead>
          {/* Table body */}
          {/* Add your table rows here */}
          <tbody className="text-gray-700 text-sm md:text-base">
            <tr className="border-t">
              <td className="px-4 py-3">#01</td>
              <td className="px-4 py-3">Hello</td>
              <td className="px-4 py-3">25-05-2025</td>
              <td className="px-4 py-3 text-yellow-500 font-medium">
                In Progress
              </td>
              <td className="px-4 py-3 text-gray-400">N/A</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Form;
