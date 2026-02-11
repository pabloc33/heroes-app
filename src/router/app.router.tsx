import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { lazy } from "react";
import { createHashRouter, Navigate } from "react-router";
import { HomePage } from "../heroes/pages/home/HomePage";
//import { SearchPage } from "@/heroes/pages/search/SearchPage";
import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroesLayout } from "@/heroes/pages/layouts/HeroesLayout";

const SearchPage = lazy(() => import("@/heroes/pages/search/SearchPage"));

// export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([
  {
    path: "/",
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "heroes/:slugId",
        element: <HeroPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "*",
        element: <Navigate to={"/"} />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
]);
