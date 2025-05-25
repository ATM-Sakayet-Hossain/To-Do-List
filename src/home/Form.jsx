import React, { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { FaRegCheckCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Form = () => {
  const db = getDatabase();
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!description) {
      alert(
        "তুমি শুধু টাইটেল দাও, বাকি গল্পটা কোথায়? এমন করলে তো কাজের বায়োডাটা নয়, ইনস্টাগ্রাম ক্যাপশন মনে হয়!"
      );
      return;
    } else if (!deadline) {
      alert(
        "ভাই, ডেডলাইন ছাড়া টাস্ক মানে প্রেমের প্রমিস — আজ না কাল, কাল না পরশু!"
      );
      return;
    } else if (!status) {
      alert(
        "তোমার স্ট্যাটাস না থাকায় মনটা বলতেছে — হয়তো করবা, হয়তো করবা না, হয়তো করেও ফেলছো... কে জানে!"
      );
      return;
    } else if (!note) {
      alert(
        "তোমার এই কাজ দেখে মনে হচ্ছে গোপন মিশনে আছো, নোট দিলেই বুঝি মিশন ফেইল!"
      );
      return;
    } else {
      alert(
        "তুমি সাবমিট করছো, এখন প্রার্থনা করো যেন এটা কাউকে রিভিউ করতে না হয়!"
      );
    }
    set(push(ref(db, "toDoList/")), {
      descriptionItem: description,
      deadlineDate: deadline,
      statusItem: status,
      noteItem: note,
    });
    setDescription("");
    setDeadline("");
    setStatus("");
    setNote("");
  };

  useEffect(() => {
    onValue(ref(db, "toDoList/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setToDoList(arr);
    });
  }, []);

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
          <form
            onSubmit={handelSubmit}
            className="flex flex-col items-center justify-center mt-5"
          >
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex items-center justify-between gap-4">
                <div className="w-1/2">
                  <p className="text-center font-semibold text-xl">
                    Project Description
                  </p>
                  <input
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Project Description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="w-1/2">
                  <p className="text-center font-semibold text-xl">Deadline</p>
                  <input
                    type="date"
                    onChange={(e) => setDeadline(e.target.value)}
                    value={deadline}
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
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
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
                    onChange={(e) => setNote(e.target.value)}
                    value={note}
                    placeholder="Notes"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-3"
            >
              Add
            </button>
          </form>
          <div className=" flex items-center justify-center m-auto">
        <button
          onClick={() => setShowTable(!showTable)}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-3"
        >
          To-Do List
        </button>
      </div>
        </div>
      </div>
      {/* table data  */}
      {showTable && (
        <div className="w-300 bg-white mt-5 m-auto">
          <div className="overflow-x-auto rounded-2xl outline-1 outline-blue-400">
            <table className="min-w-full table-fixed">
              <thead className="bg-gray-100 text-gray-600 text-left text-base font-semibold sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 w-10">#</th>
                  <th className="px-4 py-3 w-1/4">Project Description</th>
                  <th className="px-4 py-3 w-1/4">Deadline</th>
                  <th className="px-4 py-3 w-1/4">Status</th>
                  <th className="px-4 py-3 w-1/4">Notes</th>
                  <th className="px-4 py-3 w-10">Edit</th>
                  <th className="px-4 py-3 w-10">Delete</th>
                </tr>
              </thead>
            </table>

            {/* Scrollable tbody wrapper */}
            <div className="overflow-y-auto max-h-64">
              <table className="min-w-full table-fixed">
                <tbody className="text-gray-700 text-sm md:text-base">
                  {toDoList.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-3 w-10">{index + 1}</td>
                      <td className="px-4 py-3 w-1/4">
                        {item.descriptionItem}
                      </td>
                      <td className="px-4 py-3 w-1/4">{item.deadlineDate}</td>
                      <td className="px-4 py-3 w-1/4 text-green-500 font-medium">
                        {item.statusItem}
                      </td>
                      <td className="px-4 py-3 w-1/4 text-gray-400">
                        {item.noteItem}
                      </td>
                      <td className="px-5.25 py-3 w-10 text-2xl text-gray-400">
                        <FaRegEdit/>
                      </td>
                      <td className="px-5.25 py-3 w-10 text-2xl text-gray-400">
                        <MdDelete />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
