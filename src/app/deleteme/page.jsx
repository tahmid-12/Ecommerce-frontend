"use client";
import { useState } from "react";

export default function DeleteMe() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full py-10 bg-gray-100">
      <h2 className="mb-6 text-4xl font-semibold text-center text-primary">
        Delete Your Account
      </h2>
      <p className="mb-8 text-center text-gray-500">
        Please provide your details to delete your account.
      </p>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <form>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-4 border border-orange-500 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Your Full Name"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="block mb-2 text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full p-4 border border-orange-500 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Phone Number"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-4 border border-orange-500 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Email Address"
            />
          </div>
          {/* reason */}
          <div className="mb-6">
            <label htmlFor="reason" className="block mb-2 text-gray-700">
              Reason
            </label>
            <textarea
              id="reason"
              className="w-full p-4 border border-orange-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Why do you want to delete your account?"
            ></textarea>
          </div>
          <div className="flex justify-between mb-6">
            <label className="flex items-center text-gray-700">
              <input type="checkbox" className="mr-2 text-orange-500" />I
              confirm to delete my account
            </label>
          </div>
          <button
            type="submit"
            className="w-full p-4 text-white transition duration-300 bg-orange-500 rounded-full hover:bg-orange-600"
          >
            Delete Account
          </button>
        </form>
      </div>
       
    </div>
  );
}
