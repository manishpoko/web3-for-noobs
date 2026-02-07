import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import CategoryPage from "./pages/CategoryPage";
import CreatePostPage from "./pages/CreatePostPage";
import LoginPage from "./pages/LoginPage";
import EditPostPage from "./pages/EditPostPage";
import PrivateRoute from "./components/PrivateRoute";
import SignupPage from "./pages/SignupPage";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      {/* THEMED TOASTER -with the revamoed Cyberpunk design theme
      */}
      <Toaster 
        position="top-center"
        toastOptions={{
          className: '',
          style: {
            border: '1px solid #222',
            padding: '12px 24px',
            color: '#CCFF00',      // Acid Green Text
            backgroundColor: '#050505', // Deep Black Background
            fontFamily: '"Space Mono", monospace', // Tech Font
            borderRadius: '0px',   // (No rounded corners)
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          },
          // Customizing the success tick
          success: {
            iconTheme: {
              primary: '#CCFF00',
              secondary: 'black',
            },
            style: {
               border: '1px solid #CCFF00', // Green border for success
            }
          },
          // Customizing the error X
          error: {
            iconTheme: {
              primary: '#ef4444', // Red
              secondary: 'black',
            },
            style: {
              border: '1px solid #ef4444', // Red border for error
              color: '#ef4444'
            },
          },
        }}
      />

      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />}/>
          <Route path="post/:slug" element={<ArticlePage />} />
          <Route path="categories/:category" element={<CategoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

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