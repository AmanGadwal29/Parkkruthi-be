import React, { useEffect, useState } from "react";
import { Plus, Trash } from "lucide-react";
import axios from "axios";

const ShimmerCard = () => (
  <div className="animate-pulse flex flex-col justify-between h-full p-4 rounded-lg border border-gray-200 bg-white shadow-sm">
    <div className="flex justify-between items-start mb-3">
      <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
      <div className="h-4 w-4 bg-gray-300 rounded"></div>
    </div>
    <div className="mb-2 space-y-2">
      <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
      <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
    </div>
    <div className="space-y-2 mb-3">
      <div className="h-3 w-full bg-gray-200 rounded"></div>
      <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
      <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
    </div>
    <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100 text-sm">
      <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
      <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [tab, setTab] = useState("");
  const [products, setProducts] = useState({});
  const [tabs, setTabs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [reload, setReload] = useState(0);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
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
        setLoading(true);
        const res = await axios.get("http://localhost:8000/api/v1/products");
        const payload = res?.data?.data?.allProducts || [];
        const categoryMap = {};
        const tabSet = new Set();
        const categoryList = new Set();

        payload.forEach((item) => {
          if (!item.Category) return;
          const words = item.Category.trim().split(/\s+/);
          const key = words.length > 1 ? words[words.length - 1].toLowerCase() : words[0].toLowerCase();
          tabSet.add(key);
          categoryList.add(item.Category);
          if (!categoryMap[key]) categoryMap[key] = [];
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
        if (tabSet.size > 0 && !tab) setTab([...tabSet][0]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reload]);

  const handleAdd = async () => {
    const payload = {
      ImageURL: newItem?.Image ? [newItem.Image] : [],
      Title: newItem.Title?.trim() || "",
      Description: newItem.Description?.trim() || "",
      Price: Number(newItem.Price),
      Stocks: Number(newItem.Stocks),
      Category: newItem.Category?.trim() || "",
    };

    try {
      await axios.post(`http://localhost:8000/api/v1/products/${tab}`, payload);
      setShowModal(false);
      setReload((prev) => prev + 1);
      resetModal();
    } catch (error) {
      console.error("Error submitting item:", error);
    }
  };

  const handleDelete = async () => {
    if (!deleteItemId) return;
    try {
      await axios.delete(`http://localhost:8000/api/v1/products/${tab}/${deleteItemId}`);
      setConfirmDeleteModal(false);
      setReload((prev) => prev + 1);
      setDeleteItemId(null);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const resetModal = () => {
    setNewItem({
      Image: "",
      Title: "",
      Description: "",
      Price: 0,
      Stocks: 0,
      Category: "",
    });
  };

  const items = products[tab] || [];

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-80">
      <h1 className="text-3xl font-sans text-[#276139] my-6 font-bold">Admin Dashboard</h1>

      {/* Desktop Tabs */}
      <div className="hidden md:flex gap-4 mb-6 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full transition duration-150 ${
              tab === t ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden mb-6">
        <label htmlFor="category-select" className="block mb-2 text-sm font-medium text-gray-700">
          Select Category
        </label>
        <select
          id="category-select"
          value={tab}
          onChange={(e) => setTab(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 ease-in-out"
        >
          {tabs.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Add Button */}
      <button
        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={() => setShowModal(true)}
      >
        <Plus size={20} /> Add Item
      </button>

      {/* Product Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[60vh] overflow-y-scroll p-2">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => <ShimmerCard key={index} />)
          : items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between h-full p-4 rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-lg font-bold text-gray-800 leading-tight w-3/4 truncate">
                    {item.name}
                  </h2>
                  <button
                    className="text-red-600 hover:text-red-700"
                    onClick={() => {
                      setDeleteItemId(item.id);
                      setConfirmDeleteModal(true);
                    }}
                  >
                    <Trash size={18} />
                  </button>
                </div>
                <div className="mb-2">
                  <p className="text-md font-semibold text-green-700">₹{item.price}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{item.description}</p>
                <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100 text-sm">
                  <span className="text-gray-500">
                    Stock: <span className="font-medium">{item.stock}</span>
                  </span>
                  <span className="text-gray-400 text-xs">ID: {item.id.slice(-5)}</span>
                </div>
              </div>
            ))}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md space-y-4">
            <h3 className="text-lg font-bold">Add New Item</h3>
            <input
              type="text"
              placeholder="Image URL (optional)"
              className="w-full p-2 border rounded"
              value={newItem.Image}
              onChange={(e) => setNewItem((prev) => ({ ...prev, Image: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border rounded"
              value={newItem.Title}
              onChange={(e) => setNewItem((prev) => ({ ...prev, Title: e.target.value }))}
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 border rounded"
              value={newItem.Description}
              onChange={(e) => setNewItem((prev) => ({ ...prev, Description: e.target.value }))}
            />
            <input
              type="number"
              placeholder="Price"
              min={1}
              className="w-full p-2 border rounded"
              value={newItem.Price === 0 ? "" : newItem.Price}
              onChange={(e) => setNewItem((prev) => ({ ...prev, Price: Number(e.target.value) }))}
            />
            <input
              type="number"
              placeholder="Stocks"
              min={0}
              className="w-full p-2 border rounded"
              value={newItem.Stocks === 0 ? "" : newItem.Stocks}
              onChange={(e) => setNewItem((prev) => ({ ...prev, Stocks: Number(e.target.value) }))}
            />
            <select
              value={newItem.Category}
              onChange={(e) => setNewItem((prev) => ({ ...prev, Category: e.target.value }))}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>
                Select Category
              </option>
              {allCategories
                .filter((cat) => {
                  const words = cat.trim().split(/\s+/);
                  return words.length === 1
                    ? words[0].toLowerCase() === tab
                    : words[words.length - 1].toLowerCase() === tab;
                })
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
            <div className="flex justify-end gap-2 pt-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => {
                  setShowModal(false);
                  resetModal();
                }}
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

      {/* Confirm Delete Modal */}
      {confirmDeleteModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md space-y-4 text-center">
            <h2 className="text-xl font-bold">
              Are you sure you want to delete this item?
            </h2>
            <div className="flex justify-center gap-4 pt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => {
                  setConfirmDeleteModal(false);
                  setDeleteItemId(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
