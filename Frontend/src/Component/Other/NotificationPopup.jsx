import React from "react";

const NotificationPopup = ({ onAllow, onDecline }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Enable Notifications?</h3>
        <p className="text-gray-600">We’d like to send you updates.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onAllow}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Allow
          </button>
          <button
            onClick={onDecline}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
