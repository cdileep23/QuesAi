import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/CustomComponents/Body.jsx";

import { Provider } from "react-redux";

import { Toaster } from "./components/ui/sonner";
import Home from "./Pages/Home.jsx";
import Auth from "./Pages/Auth.jsx";
import appStore from "./store/store.js";
import ProjectLayout from "./components/CustomComponents/ProjectLayout.jsx";
import AddPodcast from "./components/CustomComponents/AddPodcast.jsx";
import Repurpose from "./components/CustomComponents/Repurpose.jsx";
import { PodCastWidget } from "./components/CustomComponents/PodCastWidget.jsx";
import { Upgrade } from "./components/CustomComponents/Upgrade.jsx";
import UserProfile from "./components/CustomComponents/UserProfile.jsx";
import PodCast from "./components/CustomComponents/PodCast.jsx";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/project/:projectId",
        element: <ProjectLayout />,
        children: [
          {
            path: "add-podcast", // Relative path - no leading slash
            element: <AddPodcast />,
            children: [
              {
                path: "podcast/:podcastId",
                element: <PodCast />,
              },
            ],
          },
          {
            path: "repurpose",
            element: <Repurpose />,
          },
          {
            path: "podcast-widget",
            element: <PodCastWidget />,
          },
          {
            path: "upgrade",
            element: <Upgrade />,
          },
          {
            path: "profile",
            element: <UserProfile />,
          },
        ],
      },

      {
        path: "auth",
        element: <Auth />,
      },
    ],
  },
]);

const App = () => {
  return (
    <main>
      <Toaster />
      <Provider store={appStore}>
        <RouterProvider router={appRouter} />
      </Provider>
    </main>
  );
};

export default App;
