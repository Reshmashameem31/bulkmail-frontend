import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const History = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await axios.get("https://bulkmail-backend-2-id90.onrender.com/emails");
        console.log("Fetched emails:", res.data); // debug
        setEmails(res.data);
      } catch (err) {
        console.error("Failed to fetch emails", err);
      }
    };

    fetchEmails();
  }, []);

  const handleDelete = (index) => {
    const updated = emails.filter((_, i) => i !== index);
    setEmails(updated);
  };

  return (
    <div
      className="min-h-screen bg-cover flex flex-col items-center justify-start"
      style={{
        backgroundImage:
          "url('https://www.bankatfirst.com/business/resources/flourish/email-marketing-to-get-qualified-leads/_jcr_content/root/responsivegrid/container/responsiveimage/mobile-image.coreimg.jpeg/1666280108401/email-marketing-blog-1536x635.jpeg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Navbar />

      <header className="w-full p-4 text-center mt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-cyan-500">
          Email History
        </h1>
        <p className="text-lg md:text-xl text-white mt-1">
          Check the status of all emails sent
        </p>
      </header>

      <div className="bg-sky-700 rounded-xl shadow-xl p-4 md:p-6 mt-16 w-[90%] md:max-w-4xl">
        <table className="mx-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-2 md:p-3">Subject</th>
              <th className="p-2 md:p-3">Status</th>
              <th className="p-2 md:p-3">Date</th>
              <th className="p-2 md:p-3">Recipients</th>
              <th className="p-2 md:p-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {emails.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-300">
                  No email history available 📭
                </td>
              </tr>
            ) : (
              emails.map((email, index) => (
                <tr key={index} className="border-t hover:bg-gray-100">
                  <td className="p-2">{email.subject}</td>
                  <td
                    className={`p-2 font-semibold ${
                      email.status === "Success" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {email.status === "Success" ? "✅ Success" : "❌ Fail"}
                  </td>
                  <td className="p-2">{new Date(email.date).toLocaleString()}</td>
                  <td className="p-2">{email.emailList.length}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <footer className="mt-8 p-6 text-center text-white">
        <p>BulkMail App &copy; 2025</p>
      </footer>
    </div>
  );
};

export default History;
