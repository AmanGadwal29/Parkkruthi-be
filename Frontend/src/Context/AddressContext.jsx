import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState([]);
  const [defaultAddress, setDefaultAddressInternal] = useState(null);
  const [addressFetched, setAddressFetched] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const ADDRESS_API = import.meta.env.VITE_ADDRESS_API;

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };

  // Fetch addresses from backend
  const fetchAddresses = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await axios.get(`${ADDRESS_API}`, header);
      const fetchedAddresses = response.data.addresses;
      setAddress(fetchedAddresses);
      setAddressFetched(true);

      const savedId = localStorage.getItem("defaultAddressId");
      const matched = fetchedAddresses.find(addr => addr._id === savedId);
      if (matched) {
        setDefaultAddressInternal(matched);
      } else if (fetchedAddresses.length > 0) {
        // fallback: set first address if no match in storage
        setDefaultAddressInternal(fetchedAddresses[0]);
        localStorage.setItem("defaultAddressId", fetchedAddresses[0]._id);
      }

    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Add a new address
  const addAddress = async (newAddress) => {
    setLoading(true);
    try {
      await axios.post(`${ADDRESS_API}`, newAddress, header);
      toast.success('Address added successfully');
      await fetchAddresses();
    } catch (error) {
      toast.error('Failed to add address');
    } finally {
      setLoading(false);
    }
  };

  // Edit an address
  const editAddress = async (id, updatedAddress) => {
    setLoading(true);
    try {
      const response = await axios.put(`${ADDRESS_API}/${id}`, updatedAddress, header);
      setAddress((prev) =>
        prev.map((addr) => addr.id === id ? response.data : addr)
      );
      toast.success('Address updated successfully');
    } catch (error) {
      toast.error('Failed to update address');
    } finally {
      setLoading(false);
    }
  };

  // Delete an address
  const deleteAddress = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${ADDRESS_API}/${id}`, header);
      setAddress((prev) => prev.filter((addr) => addr.id !== id));

      if (defaultAddress?.id === id) {
        setDefaultAddressInternal(null);
        localStorage.removeItem("defaultAddressId");
      }

      toast.success('Address deleted successfully');
    } catch (error) {
      toast.error('Failed to delete address');
    } finally {
      setLoading(false);
    }
  };

  // Set default address by ID (and persist)
  const setDefaultAddressById = (id) => {
    const selected = address.find(addr => addr._id === id);
    if (selected) {
      setDefaultAddressInternal(selected);
      localStorage.setItem("defaultAddressId", id);
    }
  };

  // Auto-open modal if no address
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isAuthenticated");
    if (userLoggedIn && addressFetched && address.length < 1) {
      setShowAddressModal(true);
    } else {
      setShowAddressModal(false);
    }
  }, [address, addressFetched]);

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <AddressContext.Provider
      value={{
        address,
        defaultAddress,
        setDefaultAddress: setDefaultAddressById,
        loading,
        showAddressModal,
        setShowAddressModal,
        addAddress,
        editAddress,
        deleteAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
