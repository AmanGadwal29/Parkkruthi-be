import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import axios from "axios";

const AdminDashboard = () => {
  const [tab, setTab] = useState("plants");
  const [plants, setPlants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pots, setPots] = useState([]);
  const [newItem, setNewItem] = useState({
    Image: "",
    Title: "",
    Description: "",
    Price: 0,
    Stocks: 0,
    Category: "",
  });

  // console.log(newItem);

  // useEffect(() => {
  //   // Simulated backend data
  //   setPlants([
  //     {
  //       id: 1,
  //       name: "Snake Plant",
  //       price: "250",
  //       description: "Air-purifying indoor plant",
  //       stock: "15",
  //       imagePreview: "https://via.placeholder.com/150",
  //     },
  //   ]);
  //   setPots([
  //     {
  //       id: 1,
  //       name: "Clay Pot",
  //       price: "120",
  //       description: "Traditional eco-friendly pot",
  //       stock: "40",
  //       imagePreview: "https://via.placeholder.com/150",
  //     },
  //   ]);
  // }, []);

  const handleAdd = async () => {
    if (!newItem.Title || newItem.Price < 1 || !newItem.Stocks < 0) {
      alert("Please fill all fields correctly");
      return;
    }

    await axios.post("http://localhost:3000/plantsapi/addplant");

    const newId = Date.now();
    const newItemWithId = { id: newId, ...newItem };

    if (tab === "plants") setPlants([...plants, newItemWithId]);
    else setPots([...pots, newItemWithId]);

    // Reset
    setNewItem({
      Image: "",
      Title: "",
      Description: "",
      Price: 0,
      Stocks: 0,
      Category: "",
    });
    setShowModal(false);
  };

  const items = tab === "plants" ? plants : pots;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["plants", "pots"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full ${
              tab === t ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Add Button */}
      <button
        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={() => setShowModal(true)}
      >
        <Plus size={20} /> Add {tab === "plants" ? "Plant" : "Pot"}
      </button>

      {/* List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow-sm bg-white addItemAdmin">
            {item.imagePreview && (
              <img
                src={item.imagePreview}
                alt={item.name}
                className="h-40 w-full object-cover rounded mb-3"
              />
            )}
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">₹{item.price}</p>
            <p className="text-sm mt-1 text-gray-700">{item.description}</p>
            <p className="text-sm text-gray-500">Stock: {item.stock}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md space-y-4">
            <h3 className="text-lg font-bold">
              Add New {tab === "plants" ? "Plant" : "Pot"}
            </h3>
            <input
              type="text"
              placeholder="Image Url"
              className="w-full p-2 border rounded"
              value={newItem.Image}
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, Image: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border rounded"
              value={newItem.Title}
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, Title: e.target.value }))
              }
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 border rounded"
              value={newItem.Description}
              onChange={(e) =>
                setNewItem((prev) => ({
                  ...prev,
                  Description: e.target.value,
                }))
              }
            />
            <input
              type="number"
              placeholder="Price"
              min={1}
              className="w-full p-2 border rounded"
              value={newItem.Price === 0 ? "" : newItem.Price}
              onChange={(e) => {
                const value = Number(e.target.value);
                value >= 1
                  ? setNewItem((prev) => ({ ...prev, Price: value }))
                  : "Price can not be less than 1";
              }}
            />

            {/* Image URL input instead of file upload */}
            <input
              type="number"
              placeholder="Stocks"
              min={0}
              className="w-full p-2 border rounded"
              value={newItem.Stocks === 0 ? "" : newItem.Stocks}
              onChange={(e) => {
                const value = Number(e.target.value);
                value >= 0
                  ? setNewItem((prev) => ({ ...prev, Stocks: value }))
                  : "Stocks can not be less than 0";
              }}
            />

            {/* {newItem.imagePreview && (
              <img
                src={newItem.imagePreview}
                alt="Preview"
                className="h-32 object-cover rounded"
              />
            )} */}

            <select
              value={newItem.Category}
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, Category: e.target.value }))
              }
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>
                Category
              </option>
              <option value="Flower Plants">Flower Plants</option>
              <option value="Indoor Plants">Indoor Plants</option>
              <option value="Potted Plants">Potted Plants</option>
              <option value="Special Plants">Special Plants</option>
            </select>
            <div className="flex justify-end gap-2 pt-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
