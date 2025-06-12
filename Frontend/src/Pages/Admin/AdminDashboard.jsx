import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import axios from "axios";

const AdminDashboard = () => {
  const [tab, setTab] = useState("");
  const [products, setProducts] = useState({});
  const [tabs, setTabs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [newItem, setNewItem] = useState({
    Image: "",
    Title: "",
    Description: "",
    Price: 0,
    Stocks: 0,
    Category: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/products");
        const payload = res?.data?.data?.allProducts;
        console.log(payload);

        const categoryMap = {};
        const tabSet = new Set();
        const categoryList = new Set();

        payload?.forEach((item) => {
          const words = item.Category.trim().split(/\s+/);
          const key = words.length > 1 ? words[words.length - 1].toLowerCase() : words[0].toLowerCase();
          tabSet.add(key);
          categoryList.add(item.Category);

          if (!categoryMap[key]) {
            categoryMap[key] = [];
          }

          categoryMap[key].push({
            id: item._id,
            name: item.Title,
            price: item.Price,
            description: item.Description,
            stock: item.Stocks,
            category: item.Category,
          });
        });

        setProducts(categoryMap);
        setTabs([...tabSet]);
        setAllCategories([...categoryList]);
        setTab([...tabSet][0]); // default to first tab
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!newItem.Title || newItem.Price < 1 || newItem.Stocks < 0 || !newItem.Category) {
      alert("Please fill all fields correctly");
      return;
    }

    await axios.post("http://localhost:8000/api/v1/products", newItem); // assuming backend handles full object

    const newId = Date.now();
    const words = newItem.Category.trim().split(/\s+/);
    const tabKey = words.length > 1 ? words[words.length - 1].toLowerCase() : words[0].toLowerCase();

    const newItemWithId = { id: newId, ...newItem };

    setProducts((prev) => ({
      ...prev,
      [tabKey]: [...(prev[tabKey] || []), newItemWithId],
    }));

    if (!tabs.includes(tabKey)) {
      setTabs((prev) => [...prev, tabKey]);
    }

    if (!allCategories.includes(newItem.Category)) {
      setAllCategories((prev) => [...prev, newItem.Category]);
    }

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

  const items = products[tab] || [];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full ${tab === t ? "bg-green-600 text-white" : "bg-gray-200"}`}
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
        <Plus size={20} /> Add Item
      </button>

      {/* List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded shadow-sm bg-white addItemAdmin"
          >
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
            <h3 className="text-lg font-bold">Add New Item</h3>
            <input
              type="text"
              placeholder="Image URL (optional)"
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
                setNewItem((prev) => ({ ...prev, Price: value }));
              }}
            />
            <input
              type="number"
              placeholder="Stocks"
              min={0}
              className="w-full p-2 border rounded"
              value={newItem.Stocks === 0 ? "" : newItem.Stocks}
              onChange={(e) => {
                const value = Number(e.target.value);
                setNewItem((prev) => ({ ...prev, Stocks: value }));
              }}
            />
            <select
              value={newItem.Category}
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, Category: e.target.value }))
              }
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>
                Select Category
              </option>
              {allCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
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
