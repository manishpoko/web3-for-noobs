import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1> this h1 is from App.tsx </h1>
        <Routes>
          
          <Route path="/" element={<AppLayout />}>

            <Route index element={<HomePage />} />
            <Route path="post/:slug" element={<ArticlePage/>} />
            <Route path="categories/:slug" element={<CategoryPage/>} />

          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
