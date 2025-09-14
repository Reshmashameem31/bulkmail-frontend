import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Navbar from "./Navbar";


const SendMail = () => {
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");
  const [emailList, setEmailList] = useState([]);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const emails = XLSX.utils.sheet_to_json(worksheet, { header: "A" });
      setEmailList(emails.map((item) => item.A));
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus("");

    if (emailList.length === 0) {
      setStatus("❌ Please upload an Excel file with emails");
      setSending(false);
      return;
    }

    try {
      await axios.post("https://bulkmail-backend-1-hj39.onrender.com/sendemail", {
        subject,
        msg,
        emailList,
      });
      setStatus("✅ Emails sent successfully!");
      setSubject("");
      setMsg("");
      setEmailList([]);
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send emails");
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start relative bg-cover"
      style={{
        backgroundImage:
          "url('https://www.bankatfirst.com/business/resources/flourish/email-marketing-to-get-qualified-leads/_jcr_content/root/responsivegrid/container/responsiveimage/mobile-image.coreimg.jpeg/1666280108401/email-marketing-blog-1536x635.jpeg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Navbar />

      <header className="w-full p-4 text-center mt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 drop-shadow-[0_0_10px_#00FFFF]">
          BulkMail App
        </h1>
        <p className="text-lg md:text-xl text-white mt-2 drop-shadow-[0_0_10px_#6A0DAD]">
          Send emails efficiently to multiple recipients
        </p>
      </header>

      <img
        src='./mailimage.png'
        alt="Mail Icon"
        className="absolute w-32 left-3 top-48 md:left-1/4 md:top-36 md:w-64"
      />

      <div className="bg-sky-700 shadow-gray-400 rounded-xl shadow-md p-8 mt-10 w-[90%] max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-300 text-center mb-6">
          Compose Your Email
        </h2>

        <form onSubmit={handleSend} className="flex flex-col gap-4">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            required
            className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Message"
            required
            className="border rounded-md p-3 h-32 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <input
            type="file"
            onChange={handleFile}
            required
            className="border-dashed border-2 border-gray-600 p-4 rounded-md text-center cursor-pointer"
          />

          <button
            type="submit"
            disabled={sending}
            className="bg-gray-700 text-white font-semibold p-3 rounded-md hover:bg-gray-800 transition"
          >
            {sending ? "Sending... 📤" : "Send Email ✉️"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-300">
          Total emails: <span className="font-semibold">{emailList.length}</span>
        </p>

        {status && (
          <div className="mt-2 text-center text-gray-100 font-medium">{status}</div>
        )}
      </div>

      <footer className="mt-8 p-6 text-center text-white">
        <p>BulkMail App &copy; 2025</p>
      </footer>
    </div>
  );
};

export default SendMail;
