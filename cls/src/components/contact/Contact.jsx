import React from 'react';

function Contact() {
  return (
    <div className="flex items-center justify-center px-4 py-16">
      <form className="bg-[#e6f0ee] p-8 rounded-md shadow-md max-w-[480px] w-full space-y-5">
        <h1 className="text-xl font-semibold text-[#DCAE1D] text-center mb-4">Contact Us</h1>

        <div>
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            rows="3"
            placeholder="Write your message..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#14313a] resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#00303F] text-white py-2 rounded-md font-semibold hover:bg-[#4f7480] transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Contact;



