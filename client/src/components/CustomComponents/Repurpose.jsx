import React from 'react'
import HeaderForSm from './HeaderForSm';

const Repurpose = () => {
  return (
    <div className="h-[70vh] w-full flex flex-col">
      <HeaderForSm currentTab="Create & Repurpose" />
      <div className="flex-grow flex justify-center items-center px-4">
        <h1 className="font-bold text-[#7E22CE] text-2xl">
          Create & Repurpose
        </h1>
      </div>
    </div>
  );
}

export default Repurpose