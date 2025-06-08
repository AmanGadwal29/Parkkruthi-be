import React, { useState } from "react";
import { useAddress } from "../../Context/AddressContext";
import { toast } from "react-toastify";

const initialForm = {
  firstName: "",
  lastName: "",
  phone: "",
  pincode: "",
  city: "",
  state: "",
  street1: "",
  street2: "",
  landmark: "",
};

const AddressManager = () => {
  const {
    addresses,
    loading,
    addAddress,
    editAddress,
    deleteAddress,
    setDefaultAddress,
    defaultAddressId,
  } = useAddress();

  const [newAddress, setNewAddress] = useState(initialForm);

  const clearForm = () => setNewAddress(initialForm);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleSaveClick = () => {
    const { firstName, lastName, phone, pincode, city, state } = newAddress;
    if (!firstName || !lastName || !phone || !pincode || !city || !state) {
      toast.error("Please fill all required fields");
      return;
    }

    if (newAddress.id) {
      editAddress(newAddress.id, newAddress);
      toast.success("Address updated");
    } else {
      addAddress(newAddress);
      toast.success("Address added");
    }

    clearForm();
  };

  const handleEditClick = (id) => {
    const address = addresses.find((a) => a.id === id);
    if (address) setNewAddress(address);
  };

  const handleDeleteClick = (id) => {
    deleteAddress(id);
    toast.success("Address deleted");
  };

  const handleSetDefaultClick = (id) => {
    setDefaultAddress(id);
    toast.success("Default address set");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Manage Addresses</h2>

      {/* Address Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          { label: "First Name", name: "firstName" },
          { label: "Last Name", name: "lastName" },
          { label: "Phone", name: "phone" },
          { label: "Pincode", name: "pincode" },
          { label: "City", name: "city" },
          { label: "State", name: "state" },
          { label: "Street Address 1", name: "street1" },
          { label: "Street Address 2", name: "street2" },
          { label: "Landmark", name: "landmark" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type="text"
              name={field.name}
              value={newAddress[field.name]}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={field.label}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-8">
        <button
          onClick={handleSaveClick}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {newAddress.id ? "Update Address" : "Add Address"}
        </button>
        {newAddress.id && (
          <button
            onClick={clearForm}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* Address List */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Saved Addresses</h3>
        {loading ? (
          <p>Loading...</p>
        ) : addresses?.length === 0 ? (
          <p className="text-gray-500">No addresses added yet.</p>
        ) : (
          <ul className="space-y-4">
            {Array.isArray(addresses) &&
              addresses.map((address) => (
                <li
                  key={address.id}
                  className={`border rounded-lg p-4 shadow-sm ${
                    address.id === defaultAddressId
                      ? "border-blue-600"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-lg">
                      {address.firstName} {address.lastName}
                    </div>
                    {address.id === defaultAddressId && (
                      <span className="text-sm text-blue-600 font-semibold">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-700 leading-5">
                    <p>
                      {address.street1}, {address.street2}
                    </p>
                    <p>
                      {address.city}, {address.state} - {address.pincode}
                    </p>
                    <p>Phone: {address.phone}</p>
                    {address.landmark && <p>Landmark: {address.landmark}</p>}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleEditClick(address.id)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(address.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                    {address.id !== defaultAddressId && (
                      <button
                        onClick={() => handleSetDefaultClick(address.id)}
                        className="text-green-600 hover:underline text-sm"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddressManager;
