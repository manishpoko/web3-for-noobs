import {  Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import CategoryPage from "./pages/CategoryPage";
import CreatePostPage from "./pages/CreatePostPage";
import LoginPage from "./pages/LoginPage";
import EditPostPage from "./pages/EditPostPage";

function App() {
  return (
      <div>
        <h1> this h1 is from App.tsx </h1>
        <Routes>
          
          <Route path="/" element={<AppLayout />}>

            <Route index element={<HomePage />} />
            <Route path="post/:article" element={<ArticlePage/>} />
            <Route path="categories/:category" element={<CategoryPage/>} />
            <Route path="create" element={<CreatePostPage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/edit/:id" element={<EditPostPage/>} />

          </Route>

        </Routes>
      </div>

  );
}

export default App;
