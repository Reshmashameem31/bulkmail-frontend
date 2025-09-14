import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SendMail from "./SendMail";
import History from "./History";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SendMail />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
