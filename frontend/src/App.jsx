import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import CategoryPage from "./pages/CategoryPage";
import PostPage from "./pages/PostPage";
import CodingShowcase from "./components/CodingShowcase";
import BackToHome from "./components/BackToHome"; // Import the floating button

export default function App() {
  return (
    <BrowserRouter>
      {/* Floating Back to Home button */}
      <BackToHome />

      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* CREATE POST */}
        <Route path="/create-post" element={<CreatePost />} />

        {/* CODING SHOWCASE */}
        <Route path="/coding-showcase" element={<CodingShowcase />} />

        {/* CATEGORY PAGES */}
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/category/:category/:postSlug" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}
