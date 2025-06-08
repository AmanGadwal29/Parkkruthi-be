import React, { useState } from "react";
import { useAddress } from "../../Context/AddressContext";
import AddressForm from "./AddressForm";

const AddressModal = () => {
  const { setShowAddressModal, addAddress } = useAddress();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    street1: "",
    street2: "",
    landmark: "",
  });

  const [errors, setErrors] = useState({ pincode: "" });


  const onSave = async () => {
    try {
      await addAddress(address);
      setShowAddressModal(false);
    } catch (err) {
      console.error("Error saving address:", err);
    }
  };

  const onCancel = () => {
    setShowAddressModal(false);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-3xl mx-4 rounded-2xl shadow-xl p-6 md:p-8 max-h-[95vh] overflow-hidden animate-fadeIn">
        <AddressForm
          address={address}
          setAddress={setAddress}
          errors={errors}
          setErrors={setErrors}
          onSave={onSave}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
};

export default AddressModal;
