import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationPopup from "../../Component/Other/NotificationPopup";
import { jwtDecode } from "jwt-decode"; 
import { useAddress } from "../../Context/AddressContext";

const Form = () => {
  const [user, setUser] = useState({ Name: "", Password: "" });
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [vapidPublicKey, setVapidPublicKey] = useState(null);
  const navigate = useNavigate();
  const usersApiUrl = import.meta.env.VITE_USERS_API;
  const subscriptionApiUrl = import.meta.env.VITE_SUBSCRIPTION_API;

  const { address, setShowAddressModal } = useAddress();

  useEffect(() => {
    const fetchKey = async () => {
      try {
        const { data } = await axios.get(import.meta.env.VITE_NOTIFY_KEY);
        setVapidPublicKey(data.PUBLIC_KEY);
      } catch (err) {
        console.error("Failed to fetch VAPID key:", err);
      }
    };
    fetchKey();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const loginPromise = axios.post(`${usersApiUrl}/login`, user);

    toast.promise(
      loginPromise,
      {
        pending: "Logging in...",
        success: "Login successful!",
        error: "Login failed. Please check your credentials.",
      },
      { position: "top-right" }
    );

    try {
      const res = await loginPromise;
      
      let token = res.data.data.token

      if (res.data.status === "Success") {
        const userData = res.data.data;
        localStorage.setItem("user", JSON.stringify({...userData,token}));
        localStorage.setItem("isAuthenticated", true);
        setShowNotificationPopup(true);
      } else {
        toast.error(res.data.message || "Invalid credentials", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // 🔔 Called when user clicks "Allow"
const handleAllowNotifications = async () => {
  if (!("Notification" in window)) {
    toast.error("This browser does not support notifications.");
    setShowNotificationPopup(false);
    return;
  }

  // const currentPermission = Notification.permission;

  // if (currentPermission === "granted") {
  //   setShowNotificationPopup(false);
  //   await subscribeForPushNotifications();
 
  // }

  // if (currentPermission === "denied") {
  //   toast.info("Notifications permission was previously denied. Please enable it from browser settings.");
  //   setShowNotificationPopup(false);
  //   return;
  // }

  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      setShowNotificationPopup(false);
      await subscribeForPushNotifications();
       toast.info("Subscribed successfully");
    } else {
      toast.info("Notifications permission denied.");
      setShowNotificationPopup(false);
    }
  } catch (error) {
    console.error("Notification permission request failed:", error);
    toast.error("Failed to request notification permission.");
    setShowNotificationPopup(false);
  }
};


const subscribeForPushNotifications = async () => {
  try {
    const registration = await navigator.serviceWorker.ready;

    if (!vapidPublicKey) {
      toast.error("VAPID key not available.");
      return;
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
      toast.error("User not authenticated.");
      return;
    }

    const { id } = jwtDecode(user.token);

    await axios.post(subscriptionApiUrl, {
      userId: id,
      subscription,
    });

    navigate("/");
    toast.success("Notifications enabled!", { position: "top-right" });
  } catch (err) {
    console.error("Subscription error:", err);
    toast.error("Failed to subscribe for notifications.");
  }
};


  // 🔕 Called when user clicks "Decline"
  const handleDeclineNotifications = () => {
    setShowNotificationPopup(false);
    toast.info("Notifications declined.", { position: "top-right" });
     navigate("/")
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-green-50 to-green-100">
      <ToastContainer />
      {showNotificationPopup && (
        <NotificationPopup
          onAllow={handleAllowNotifications}
          onDecline={handleDeclineNotifications}
        />
      )}

      <div className="w-full max-w-sm p-6 rounded-3xl bg-white shadow-xl animate-fadeIn">
        <h2 className="text-2xl font-bold text-green-600 text-center mb-6">
          User Login
        </h2>
        <form onSubmit={submitHandler} className="space-y-5">
          <input
            required
            type="text"
            name="Name"
            value={user.Name}
            onChange={handleInput}
            placeholder="Name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            required
            type="password"
            name="Password"
            value={user.Password}
            onChange={handleInput}
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="text-right text-xs text-red-500">
            <a href="#">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Sign In
          </button>
        </form>

        <div className="flex justify-between text-sm text-green-600 mt-5">
          <Link to="/register">Register now</Link>
          <Link to="/adminlogin">Login as Admin</Link>
        </div>

        <p className="text-[10px] text-center mt-5 text-green-400">
          <a href="#">Learn user license agreement</a>
        </p>
      </div>
    </div>
  );
};
export default Form

// Converts VAPID key from Base64 to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}