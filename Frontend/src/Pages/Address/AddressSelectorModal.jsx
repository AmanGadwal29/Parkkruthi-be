import React, { useEffect, useState } from "react";
import { useAddress } from "../../Context/AddressContext";
import AddressForm from "./AddressForm";
import { CheckCircle2, PlusCircle, X } from "lucide-react";

const AddressSelectorModal = ({ onClose }) => {
    const {
        address,
        defaultAddress,
        setDefaultAddress,
        addAddress,
    } = useAddress();

    const [showAddForm, setShowAddForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
        FirstName: "",
        LastName: "",
        Phone: "",
        Pincode: "",
        City: "",
        State: "",
        Street1: "",
        Street2: "",
        Landmark: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleSelectAddress = (addressObj) => {
        setDefaultAddress(addressObj._id);
    };

    const handleAddNewAddress = async () => {
        await addAddress(newAddress);
        setShowAddForm(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl md:max-w-3xl mx-4 rounded-2xl shadow-2xl p-6 md:p-8 max-h-[95vh] overflow-y-auto animate-fadeIn">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-semibold text-green-700">
                        Select Delivery Address
                    </h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-red-600">
                        <X size={25} />
                    </button>
                </div>

                {showAddForm ? (
                    <AddressForm
                        address={newAddress}
                        setAddress={setNewAddress}
                        errors={errors}
                        setErrors={setErrors}
                        onSave={handleAddNewAddress}
                        onCancel={() => setShowAddForm(false)}
                    />
                ) : (
                    <>
                        <ul className="space-y-4 overflow-y-scroll max-h-96 p-5">
                            {address.map((addr) => {
                                const isSelected = defaultAddress?._id === addr._id;

                                return (
                                    <li
                                        key={addr._id}
                                        className={`relative border-2 p-5 rounded-xl cursor-pointer ${isSelected
                                            ? "border-green-600 bg-green-50 shadow-md"
                                            : "border-gray-200 hover:shadow-sm"
                                            }`}
                                        onClick={() => handleSelectAddress(addr)}
                                    >
                                        {isSelected && (
                                            <span className="absolute bottom-3 right-3 bg-green-600 text-white text-xs font-medium px-3 py-0.5 rounded-full shadow">
                                                Default
                                            </span>
                                        )}

                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <p className="text-sm md:text-lg font-semibold text-gray-800">
                                                    {addr.FirstName} {addr.LastName}
                                                    <span className="ml-2 text-sm font-normal text-gray-600">({addr.Phone})</span>
                                                </p>
                                                <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                                                    {addr.Street1}, {addr.Street2}, {addr.City}, {addr.State} - {addr.Pincode}
                                                </p>
                                                {addr.Landmark && (
                                                    <p className="text-sm text-gray-500 mt-0.5">
                                                        Landmark: {addr.Landmark}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition duration-200 shadow"
                            >
                                <PlusCircle size={20} />
                                Add New Address
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AddressSelectorModal;
