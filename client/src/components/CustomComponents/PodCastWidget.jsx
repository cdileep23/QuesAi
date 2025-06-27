import React from 'react'
import HeaderForSm from './HeaderForSm'

export const PodCastWidget = () => {
  return (
    <div className="h-[70vh] w-full flex flex-col">
      <HeaderForSm currentTab="Podcast Widget" />
      <div className="flex-grow flex justify-center items-center px-4">
        <h1 className="font-bold text-[#7E22CE] text-2xl">Podcast Widget</h1>
      </div>
    </div>
  );
}
