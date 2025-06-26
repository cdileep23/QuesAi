import {
  Copy,
  Diamond,
  Pen,
  Plus,
  Settings,
  HelpCircle,
  ChevronLeft,
} from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";

const NavLinks = [
  {
    path: "add-podcast",
    displayName: "Add your Podcast",
    icon: <Plus className="w-5 h-5" />,
  },
  {
    path: "repurpose",
    displayName: "Create & Repurpose",
    icon: <Pen className="w-5 h-5" />,
  },
  {
    path: "podcast-widget",
    displayName: "Podcast Widget",
    icon: <Copy className="w-5 h-5" />,
  },
  {
    path: "upgrade",
    displayName: "Upgrade",
    icon: <Diamond className="w-5 h-5" />,
  },
];

const SideBar = () => {
  const user = useSelector((store) => store.user);
  const { projectId } = useParams();
  const location = useLocation();

  return (
    <div className="h-[100vh] bg-white border-r border-gray-100 flex flex-col">
      <Link to="/" className="p-6 ">
        <img
          src="https://res.cloudinary.com/dzb0rtckl/image/upload/v1750905005/81b24b708a15005c2a5cc5fa6c34a9a4190a7020_flaniu.png"
          className="h-[30px] w-[150px]"
          alt="Ques.AI Logo"
        />
      </Link>

      <div className=" py-4">
        <nav className="px-4">
          <ul className="space-y-2">
            {NavLinks.map((navItem) => {
              const isActive = location.pathname.includes(navItem.path);
              return (
                <li key={navItem.path}>
                  <Link
                    to={`/project/${projectId}/${navItem.path}`}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <span
                      className={isActive ? "text-purple-600" : "text-gray-400"}
                    >
                      {navItem.icon}
                    </span>
                    {navItem.displayName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Help Section */}
      <div className=" flex-1 px-4 pb-4 border-t border-gray-200 pt-4 flex flex-col justify-end">
        <div className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Help</span>
        </div>
      </div>

      {/* User Info Section */}
      <div className="px-4 pb-6 border-t border-gray-200 pt-4">
        <Link to={ projectId && `/project/${projectId}/profile`}>
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="bg-gradient-to-br from-green-400 to-blue-500 text-white font-bold text-lg flex items-center justify-center rounded-full w-10 h-10 flex-shrink-0">
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {user?.name || "Username"}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || "user@email.com"}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
