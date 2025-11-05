import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './components/Home';
import PostForm from "./components/PostForm";
import { ToastContainer } from 'react-toastify';

import EditPost from "./components/EditPost";

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/postform" element={<PostForm />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-left" toastStyle={{
        fontSize: "22px", padding: "16px 20px", borderRadius: "12px",
      }} />
    </>
  );
}

export default App;
