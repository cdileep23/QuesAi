import { Button } from "@/components/ui/button";
import { BASE_URL } from "../../lib/baseurl";
import { Bell, BellRing, CirclePlus, Loader, LogOut, Settings } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { UserLoggedOut } from "@/store/userslice";
import { AddProjects, resetProjecs } from "@/store/projectSlice";
import { toast } from "sonner";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import ProjectCard from "@/components/CustomComponents/ProjectCard";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const projects = useSelector((store) => store.projects);

  const isNestedRoute =
    location.pathname !== "/" && location.pathname.startsWith("/project/");

  const fetchProjects = async () => {
    try {
      const url = `${BASE_URL}/project/get-all`;
      const res = await axios.get(url, { withCredentials: true });

      if (res.data?.success) {
        dispatch(AddProjects(res.data.projects));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const AddProject = async () => {
    setLoading(true);
    try {
      const url = `${BASE_URL}/project/create-project`;
      const res = await axios.post(url, { name }, { withCredentials: true });

      if (res.data?.success) {
        toast.success(res.data?.message);
        dispatch(resetProjecs(null));
        fetchProjects();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
      setName("");
    }
  };

  const HandleLogout = async () => {
    try {
      const url = `${BASE_URL}/user/logout`;
      const res = await axios.get(url, { withCredentials: true });
      if (res.data?.success) {
        dispatch(UserLoggedOut());
        dispatch(resetProjecs());
        toast.success(res.data?.message);
        navigate("/auth");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isNestedRoute) {
    return <Outlet />;
  }

  return (
    <div>
      <header className="h-[15vh] md:h-[20vh] w-full p-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <img
            src="https://res.cloudinary.com/dzb0rtckl/image/upload/v1750905005/81b24b708a15005c2a5cc5fa6c34a9a4190a7020_flaniu.png"
            className="h-[30px] w-[150px] md:h-[47px] md:w-[200px]"
            alt="Logo"
          />

          <div className="flex items-center gap-6">
            <Button className="bg-white shadow hover:bg-white text-[#302d2d]">
              <Settings size="30px" />
            </Button>
            <Button className="bg-white shadow hover:bg-white text-[#302d2d]">
              <BellRing />
            </Button>
          
             <Button
                      className="bg-white shadow hover:bg-white text-red-500"
                      onClick={HandleLogout}
                    >
                      <LogOut />
                    </Button>
          </div>
        </div>
      </header>

      <div className="min-h-[70vh] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-0">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Project</DialogTitle>
                <DialogDescription>
                  <label className="mb-2 block w-full">
                    Enter Project Name:
                  </label>
                  <Input
                    value={name}
                    type="text"
                    className="w-full"
                    onChange={(e) => setName(e.target.value)}
                  />
                </DialogDescription>
              </DialogHeader>

              <div className="flex justify-end gap-4 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={AddProject}
                  disabled={loading}
                >
                  <div className="flex items-center justify-center gap-2">
                    {loading && <Loader className="w-5 h-5 animate-spin" />}
                    {loading ? "Creating..." : "Create"}
                  </div>
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* If no projects */}
          {projects?.length === 0 && (
            <div className="flex-col items-center justify-center text-center space-y-2 max-w-5xl mx-auto px-2">
              <h1 className="font-bold text-3xl sm:text-4xl text-[#7E22CE] mb-2">
                Create a New Project
              </h1>
              <div className="flex justify-center items-center">
                <img
                  className="h-[200px] sm:h-[280px] w-auto"
                  src="https://res.cloudinary.com/dzb0rtckl/image/upload/v1750906483/Screenshot_2025-06-26_082426_vtrenc.png"
                  alt="Create Project"
                />
              </div>
              <p className="text-sm sm:text-base px-2 sm:px-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit...
              </p>
              <div className="flex items-center justify-center">
                <Button
                  onClick={() => setOpen(true)}
                  className="mt-2 text-base sm:text-xl px-4 py-2 flex items-center gap-2"
                >
                  <CirclePlus />
                  <span className="md:hidden">Create</span>
                  <span className="hidden md:inline">Create New Project</span>
                </Button>
              </div>
            </div>
          )}

          {/* If projects exist */}
          {projects?.length > 0 && (
            <div>
              <div className="flex justify-between items-center mt-4">
                <h1 className="font-bold text-3xl sm:text-4xl text-[#7E22CE]">
                  Projects
                </h1>
                <Button
                  onClick={() => setOpen(true)}
                  className="text-base sm:text-xl px-4 py-2 flex items-center gap-2"
                >
                  <CirclePlus />
                  <span className="md:hidden">Create</span>
                  <span className="hidden md:inline">Create New Project</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-4">
                {projects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
