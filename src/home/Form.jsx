import React, { useEffect, useState } from "react";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
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
  const [editId, setEditId] = useState(false);
  const [editValue, setEditValue] = useState({
    descriptionItem: "",
    deadlineDate: "",
    statusItem: "",
    noteItem: "",
    id: "",
  });

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
  const handelEnableEdit = (item) => {
    setEditValue(item);
    setEditId(true);
  };
  const handelupdate = () => {
    if (
      window.confirm(
        "তুমি কি নিশ্চিত যে তুমি এই কাজটা আপডেট করতে চাও? আরেকবার ভাবো!"
      )
    ) {
      if (!editValue.descriptionItem) {
      alert(
        "ভাই, টাইটেল ছাড়া তোর প্ল্যানটা তো দেখছি Netflix এর টিজারের মত — শুধু আশা, কনটেন্ট নাই!"
      );
      return;
    } else if (!editValue.deadlineDate) {
      alert(
        "ডেডলাইন ছাড়াই দিলে বাচ্চারা ভাববে এটা একটা কাল্পনিক প্রজেক্ট — শুরু আছে, শেষ নাই!"
      );
      return;
    } else if (!editValue.statusItem) {
      alert(
        "স্ট্যাটাস দাও ভাই! না দিলে মনে হবে তুমি শুধু ভাবছো, কিছু করো নাই — ভাবা কিন্তু বিল্ডিং করে না!"
      );
      return;
    } else if (!editValue.noteItem) {
      alert("নোট দিলে কি বুঝি গোপন প্রেমটা ধরা পড়ে যাবে? এত গোপনীয়তা কেন ভাই?");
      return;
    } else {
      alert(
        "তুমি আপডেট করছো! এখন শুধু দোয়া করি — রিভিউয়ার যেন coffee break-এ থাকে!"
      );
    }
    update(ref(db, "toDoList/" + editValue.id), {
      descriptionItem: editValue.descriptionItem,
      deadlineDate: editValue.deadlineDate,
      statusItem: editValue.statusItem,
      noteItem: editValue.noteItem,
      editId: editValue.id,
    });
    setEditId(false);
    }
  };
  const handelDelete = (item) => {
    if (
      window.confirm("তুমি কি সত্যিই এই কাজটা ডিলিট করতে চাও? আরেকবার ভাবো!")
    ) {
      remove(ref(db, "toDoList/" + item.id));
      }
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
      <div className="flex flex-col items-center justify-center pt-20">
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
                    onChange={(e) =>
                      editValue
                        ? setEditValue((prev) => ({
                            ...prev,
                            descriptionItem: e.target.value,
                          }))
                        : setDescription(e.target.value)
                    }
                    value={editId ? editValue.descriptionItem : description}
                    placeholder="Project Description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="w-1/2">
                  <p className="text-center font-semibold text-xl">Deadline</p>
                  <input
                    type="date"
                    onChange={(e) =>
                      editValue
                        ? setEditValue((prev) => ({
                            ...prev,
                            deadlineDate: e.target.value,
                          }))
                        : setDeadline(e.target.value)
                    }
                    value={editId ? editValue.deadlineDate : deadline}
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
                    onChange={(e) =>
                      editValue
                        ? setEditValue((prev) => ({
                            ...prev,
                            statusItem: e.target.value,
                          }))
                        : setStatus(e.target.value)
                    }
                    value={editId ? editValue.statusItem : status}
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
                    onChange={(e) =>
                      editValue
                        ? setEditValue((prev) => ({
                            ...prev,
                            noteItem: e.target.value,
                          }))
                        : setNote(e.target.value)
                    }
                    value={editId ? editValue.noteItem : note}
                    placeholder="Notes"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>
            {editId ? (
              <div className=" flex w-full items-center justify-between gap-10">
                <button
                  type="button"
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-3"
                  onClick={handelupdate}
                >
                  Update
                </button>
                <button
                  onClick={() => setEditId(false)}
                  type="button"
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-3"
                >
                  Cancle
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-3"
              >
                Add
              </button>
            )}
          </form>
          <div className=" flex items-center justify-center m-auto">
            <button
              onClick={() => setShowTable(!showTable)}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-3"
            >
              {showTable ? "Hide To-Do List" : "To-Do List"}
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
                    <tr key={item.id} className="border-t">
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
                        {/* <FaRegEdit onClick={() => handleEdit(item)} className="cursor-pointer" /> */}
                        <FaRegEdit
                          onClick={() => handelEnableEdit(item)}
                          className="cursor-pointer"
                        />
                      </td>
                      <td className="px-5.25 py-3 w-10 text-2xl text-gray-400">
                        <MdDelete
                          onClick={() => handelDelete(item)}
                          className="cursor-pointer"
                        />
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
