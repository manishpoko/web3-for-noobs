import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import CategoryPage from "./pages/CategoryPage";
import CreatePostPage from "./pages/CreatePostPage";
import LoginPage from "./pages/LoginPage";
import EditPostPage from "./pages/EditPostPage";
import PrivateRoute from "./components/PrivateRoute";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <h1 className="text-4xl font-display text-brand-primary bg-brand-peach --4 text-center border-4 border-brand-accent"> this h1 is from App.tsx </h1>

      <Toaster position="top-center"/>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />}/>
          <Route path="post/:article" element={<ArticlePage />} />
          <Route path="categories/:category" element={<CategoryPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* private routes for admin only */}
          <Route element={<PrivateRoute />}>
            <Route path="create" element={<CreatePostPage />} />
            <Route path="edit/:id" element={<EditPostPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
