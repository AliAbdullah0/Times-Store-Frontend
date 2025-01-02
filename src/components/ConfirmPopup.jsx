import React from 'react';

function ConfirmPopup({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 h-full w-full bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-bold text-red-500">Are you sure you want to delete your profile?</h2>
        <div className="mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-green-600"
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPopup;
