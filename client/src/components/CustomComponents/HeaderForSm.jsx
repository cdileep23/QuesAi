import { BellRing, Columns3, Home, LogOut } from 'lucide-react'
import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import SideBar from './SideBar';
import { Button } from '../ui/button';
import { BASE_URL } from '../../../lib/baseurl'
import axios from 'axios';
import { UserLoggedOut } from '@/store/userslice';
import { resetProjecs } from '@/store/projectSlice';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const HeaderForSm = ({ projectName, currentTab }) => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
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
  return (
    <div className="w-full flex justify-between items-center px-4 py-2">
      <div className="flex items-center gap-2 text-[#999999] font-bold flex-wrap">
        <Link to={'/'}>
          <div className="flex items-center gap-2">
            <Home />
            <h1 className="hidden lg:block">Home Page</h1>
          </div>
        </Link>
        {projectName && <span>/</span>}
        {projectName && <h1>{projectName}</h1>}
        <span>/</span>
        <h1 className="text-[#7E22CE] font-bold">{currentTab}</h1>
      </div>

      <div className="flex items-center gap-4">
        <Button className="bg-white shadow hover:bg-white text-[#302d2d]">
          <BellRing />
        </Button>

        <Sheet>
          <SheetTrigger>
            <Button className="lg:hidden" variant={"outline"}>
              <Columns3 />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SideBar />
          </SheetContent>
        </Sheet>
        <Button
          className="bg-white shadow hover:bg-white text-red-500"
          onClick={HandleLogout}
        >
          <LogOut />
        </Button>
      </div>
    </div>
  );
};

export default HeaderForSm;
