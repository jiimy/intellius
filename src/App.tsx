import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from './page/Login/Login';
import ChatPage from 'page/ChatPage/ChatPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
}

export default App;
