import React, { useEffect, useState } from "react";
import { useAddress } from "../../Context/AddressContext";

const FALLBACK_LOCATION = "Bengaluru - 560076";

const LocationFetcher = () => {
  const { defaultAddress } = useAddress();
  const [location, setLocation] = useState(FALLBACK_LOCATION);

  useEffect(() => {
    if (defaultAddress) {
      setLocation(`${defaultAddress.City} - ${defaultAddress.Pincode}`);
      return;
    }

    // Otherwise, try to fetch geolocation from browser
    if (!navigator.geolocation) {
      // Geolocation not supported, show fallback
      setLocation(FALLBACK_LOCATION);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await response.json();
          const city =
            data.city || data.locality || data.principalSubdivision || "Unknown";
          const pincode = data.postcode || "000000";
          setLocation(`${city} - ${pincode}`);
        } catch (err) {
          setLocation(FALLBACK_LOCATION);
        }
      },
      (error) => {
        // If user denies permission or any error, show fallback
        setLocation(FALLBACK_LOCATION);
      }
    );
  }, [defaultAddress]);

  return <span className="text-sm text-gray-700 font-medium">{location}</span>;
};

export default LocationFetcher;
