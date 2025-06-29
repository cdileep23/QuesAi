import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderForSm from "./HeaderForSm";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { BASE_URL } from "../../../lib/baseurl";
import axios from "axios";
import { UserLoggedIn } from "@/store/userslice";

const UserProfile = () => {
  const user = useSelector((store) => store.user);
  const [stage, setStage] = useState("view");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const url = `${BASE_URL}/user/update`;
      const res = await axios.patch(url, { name }, { withCredentials: true });

      if (res.data?.success) {
        dispatch(UserLoggedIn(res.data.user));
        toast.success(res.data.message);
        setStage("view");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    setName(user.name);
    setStage("view");
  };

  return (
    <div className="w-full">
      <HeaderForSm currentTab={"Profile"} />

      {user && (
        <div className="px-4 space-y-6 mt-6">
         
          <div className="flex flex-col md:flex-row md:items-center md:justify-around gap-4">
            {/* Avatar */}
            <div className="h-[60px] w-[60px] flex items-center justify-center text-[32px] font-bold text-[#4B0082] bg-[#E6E6FA] rounded-full shadow-md self-center md:self-auto">
              {user?.email[0]||"A"}
            </div>

            {/* Name Input */}
            <Input
              disabled={!(stage === "edit" && !loading)}
              onChange={(e) => setName(e.target.value)}
              className="w-full md:max-w-[200px]"
              value={name}
            />

            {/* Email Input */}
            <Input
              disabled
              className="w-full md:max-w-[200px]"
              value={user.email}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center md:justify-end">
            {stage === "view" ? (
              <Button onClick={() => setStage("edit")}>Edit</Button>
            ) : (
              <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                <Button
                  variant="outline"
                  onClick={handleDiscard}
                  className="border-red-500 text-red-500 w-full md:w-auto"
                  disabled={loading}
                >
                  Discard
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full md:w-auto"
                >
                  <div className="flex items-center justify-center gap-2">
                    {loading && <Loader className="w-4 h-4 animate-spin" />}
                    <span>{loading ? "Saving..." : "Save"}</span>
                  </div>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
