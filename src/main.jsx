import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider.jsx";
import { Toaster } from "@/components/ui/toaster";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreatePost from "@/components/CreatePost";
import ViewSchool from "@/components/ViewSchool";
import EditPost from "@/components/EditPost";
import ViewMore from "@/components/ViewMore";
import LoginPage from "@/components/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-post",
    element: <CreatePost />,
  },
  {
    path: "/:uniName",
    element: <ViewSchool />,
  },
  {
    path: "/:uniName/:postid",
    element: <EditPost />,
  },
  {
    path: "/viewMore/:postid",
    element: <ViewMore />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/logout",
    element: <p>test</p>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>,
);
