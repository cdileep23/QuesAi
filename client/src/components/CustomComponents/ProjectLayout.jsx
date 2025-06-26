import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import SideBar from './SideBar';

const ProjectLayout = () => {
    const{projectId}=useParams()
    console.log("projectt")
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 bg-gray-50">
      <div className=" hidden lg:block lg:col-span-1 px-5 ">
       <SideBar/>
      </div>
      <div className='pt-6 pl-4 col-span-1 lg:col-span-3 '>
<Outlet/>
      </div>
    </div>
  );
}

export default ProjectLayout