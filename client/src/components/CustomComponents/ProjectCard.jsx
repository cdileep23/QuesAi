import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);

const ProjectCard = ({ project }) => {
  const lastEdited = dayjs(project.updatedAt).fromNow(); 
  const initial = project.name?.[0]?.toUpperCase() || "P";

  return (
    <Link to={`/project/${project._id}/add-podcast`} className="mb-6">
      <div className="flex items-center border border-gray-300 rounded-xl p-4 w-full md:w-[380px] hover:shadow-md">
        <div className="flex items-center justify-center bg-amber-400 rounded-xl w-16 h-16 font-bold text-white text-xl mr-4">
          {initial}
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-purple-700 font-semibold text-lg">
            {project.name}
          </h2>
          <p className="text-sm text-gray-500">
            {project.podcasts.length} Files
          </p>{" "}
          <p className="text-xs text-gray-400 mt-1">Last edited {lastEdited}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
