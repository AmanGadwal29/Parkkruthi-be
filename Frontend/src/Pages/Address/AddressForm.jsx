import React, { useRef, useState } from "react";
import { states, karnatakaCities } from "../../data/locationData";

const inputOrder = [
  "FirstName",
  "LastName",
  "Phone",
  "Pincode",
  "City",
  "State",
  "Street1",
  "Street2",
  "Landmark",
];

const AddressForm = ({ address, setAddress, errors, setErrors, onSave, onCancel }) => {
  const inputRefs = useRef({});
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const validatePincode = (value) => {
    if (!/^\d{0,6}$/.test(value)) return "Only numeric digits allowed, max 6 digits";
    if (value.length > 0 && value.length < 6) return "Pincode must be 6 digits";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Pincode") {
      if (!/^\d{0,6}$/.test(value)) return;
      setErrors({ pincode: validatePincode(value) });
    }

    setAddress((prev) => ({ ...prev, [name]: value }));

    if (name === "City") {
      if (!value.trim()) {
        setCitySuggestions([]);
        setShowCitySuggestions(false);
        setActiveSuggestionIndex(-1);
        return;
      }
      const filtered = karnatakaCities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setCitySuggestions(filtered);
      setShowCitySuggestions(true);
      setActiveSuggestionIndex(-1);
    }
  };

  const handleCitySelect = (city) => {
    setAddress((prev) => ({ ...prev, City: city }));
    setCitySuggestions([]);
    setShowCitySuggestions(false);
    setActiveSuggestionIndex(-1);
  };

  const handleCityKeyDown = (e) => {
    if (!showCitySuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex((idx) =>
        idx + 1 >= citySuggestions.length ? 0 : idx + 1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((idx) =>
        idx <= 0 ? citySuggestions.length - 1 : idx - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (
        activeSuggestionIndex >= 0 &&
        activeSuggestionIndex < citySuggestions.length
      ) {
        handleCitySelect(citySuggestions[activeSuggestionIndex]);
      }
    }
  };

  const handleKeyDown = (e, current) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    if (current === "Pincode") {
      const err = validatePincode(address.Pincode);
      setErrors({ pincode: err });
      if (err) {
        inputRefs.current.Pincode.focus();
        return;
      }
    } else if (current === "City") {
      if (showCitySuggestions && activeSuggestionIndex >= 0) {
        handleCitySelect(citySuggestions[activeSuggestionIndex]);
        return;
      }
      if (!address.City.trim()) return;
    } else if (!address[current]?.trim()) {
      return;
    }

    const currentIndex = inputOrder.indexOf(current);
    if (currentIndex === -1) return;

    const nextInput = inputOrder[currentIndex + 1];
    if (nextInput) {
      inputRefs.current[nextInput]?.focus();
    } else {
      onSave();
    }
  };

  const commonInputClass =
    "border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition w-full";

  return (
    <>
      <h2 className="text-2xl font-semibold text-center text-green-600 mb-6">
        Add Delivery Address
      </h2>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
      >
        <input
          ref={(el) => (inputRefs.current.FirstName = el)}
          type="text"
          name="FirstName"
          value={address.FirstName}
          onChange={handleChange}
          placeholder="First Name"
          required
          onKeyDown={(e) => handleKeyDown(e, "FirstName")}
          className={commonInputClass}
        />

        <input
          ref={(el) => (inputRefs.current.LastName = el)}
          type="text"
          name="LastName"
          value={address.LastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
          onKeyDown={(e) => handleKeyDown(e, "LastName")}
          className={commonInputClass}
        />

        <input
          ref={(el) => (inputRefs.current.Phone = el)}
          type="tel"
          name="Phone"
          value={address.Phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          onKeyDown={(e) => handleKeyDown(e, "Phone")}
          className={commonInputClass}
        />

        <div className="relative">
          <input
            ref={(el) => (inputRefs.current.Pincode = el)}
            type="text"
            name="Pincode"
            value={address.Pincode}
            onChange={handleChange}
            placeholder="Pincode"
            required
            maxLength={6}
            onKeyDown={(e) => handleKeyDown(e, "Pincode")}
            className={`${
              errors.pincode
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-green-500"
            } ${commonInputClass}`}
          />
          {errors.pincode && (
            <p className="absolute -bottom-4 text-red-500 text-sm mt-1">{errors.pincode}</p>
          )}
        </div>

        <div className="relative">
          <input
            ref={(el) => (inputRefs.current.City = el)}
            type="text"
            name="City"
            value={address.City}
            onChange={handleChange}
            placeholder="Town/City"
            autoComplete="off"
            required
            onFocus={() => {
              if (address?.City?.trim()) setShowCitySuggestions(true);
            }}
            onKeyDown={(e) => {
              handleCityKeyDown(e);
              handleKeyDown(e, "City");
            }}
            className={commonInputClass}
          />
          {showCitySuggestions && citySuggestions.length > 0 && (
            <ul className="absolute z-50 bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-y-auto w-full mt-1">
              {citySuggestions.map((city, idx) => (
                <li
                  key={city}
                  className={`px-4 py-2 cursor-pointer hover:bg-green-100 ${
                    idx === activeSuggestionIndex ? "bg-green-200" : ""
                  }`}
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        <select
          ref={(el) => (inputRefs.current.State = el)}
          name="State"
          value={address.State}
          onChange={handleChange}
          required
          onKeyDown={(e) => handleKeyDown(e, "State")}
          className={commonInputClass}
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <input
          ref={(el) => (inputRefs.current.Street1 = el)}
          type="text"
          name="Street1"
          value={address.Street1}
          onChange={handleChange}
          placeholder="Street Address 1"
          required
          onKeyDown={(e) => handleKeyDown(e, "Street1")}
          className="md:col-span-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition w-full"
        />

        <input
          ref={(el) => (inputRefs.current.Street2 = el)}
          type="text"
          name="Street2"
          value={address.Street2}
          onChange={handleChange}
          placeholder="Street Address 2 (Optional)"
          onKeyDown={(e) => handleKeyDown(e, "Street2")}
          className="md:col-span-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition w-full"
        />

        <input
          ref={(el) => (inputRefs.current.Landmark = el)}
          type="text"
          name="Landmark"
          value={address.Landmark}
          onChange={handleChange}
          placeholder="Landmark (Optional)"
          onKeyDown={(e) => handleKeyDown(e, "Landmark")}
          className="md:col-span-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition w-full"
        />

        <div className="md:col-span-2 flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default AddressForm;
