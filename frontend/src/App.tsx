import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import WrongRoute from "./pages/WrongRoute/WrongRoute";
import Contact from "./pages/Contact/Contact";
import Experience from "./pages/Experience/Experience";
import Settings from "./layouts/Settings/Settings";
import { Toaster } from "react-hot-toast";
import ErrorPage from "./pages/Error/ErrorPage";
import SettingsHome from "./pages/Settings/Home/Settings-Home";
import SettingsProjects from "./pages/Settings/Projects/Settings-Projects";
import SettingsSkills from "./pages/Settings/Skills/Settings-Skills";
import SettingsPersonal from "./pages/Settings/Personal/Settings-Personal";
import SettingsContact from "./pages/Settings/Contact/Settings-Contact";
import SettingsExperience from "./pages/Settings/Experience/Settings-Experience";
import SettingsMessages from "./pages/Settings/Messages/Settings-Messages";
import SettingsLogs from "./pages/Settings/TheLogs/Settings-Logs";
import { LoadingProvider } from "./contexts/LoadingContext";
import { GlobalLoader } from "./components/layout/GlobalLoader/GlobalLoader";

function RootLayout() {
  return (
    <div className="layout">
      <Toaster
        toastOptions={{ duration: 5000 }}
        containerStyle={{ fontSize: "1.4vmax", fontWeight: 600 }}
      />
      <Navbar />
      <div className="content">
        <GlobalLoader />
        <Outlet /> {/* Pages will be rendered here */}
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "projects", element: <Projects /> },
      { path: "contact", element: <Contact /> },
      { path: "experience", element: <Experience /> },
      {
        path: "settings",
        element: <Settings />,
        children: [
          { index: true, element: <SettingsHome /> },
          { path: "home", element: <SettingsHome /> },
          { path: "personal", element: <SettingsPersonal /> },
          { path: "skills", element: <SettingsSkills /> },
          { path: "projects", element: <SettingsProjects /> },
          { path: "contact", element: <SettingsContact /> },
          { path: "experience", element: <SettingsExperience /> },
          { path: "messages", element: <SettingsMessages /> },
          { path: "logs", element: <SettingsLogs /> },
        ],
      },
      { path: "*", element: <WrongRoute /> },
    ],
  },
]);

export default function App() {
  return (
    <LoadingProvider>
      <RouterProvider router={router} />
    </LoadingProvider>
  );
}
