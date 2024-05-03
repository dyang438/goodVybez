import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter } from 'react-router-dom';
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from './Auth/AuthContext.tsx';
import Root from './root.tsx';
import SignupComponent from './Login/SignupComponent.tsx';
import LoginComponent from './Login/LoginComponent.tsx'
import PostDetailPage from './Post/PostDetailPage.tsx';
import NewPostPage from './Post/NewPostPage.tsx';
import './css/index.css';

const router = createHashRouter([
  {
    path: "/*",
    element: <Root />,
    children: [
      {
        path: "post/:postId",
        element: <PostDetailPage/>
      },
    ],
  },
  {
    path: "addPost",
    element: <NewPostPage/>
  },
  {
    path: "signup",
    element: <SignupComponent/>
  },
  {
    path: "login",
    element: <LoginComponent/>
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)