import { CloudUpload } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import dayjs from "dayjs";
import { BASE_URL } from "../../../lib/baseurl";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const PodcastTable = ({ podcasts, setOpen, fetchProjectById }) => {
  const [deletingId, setDeletingId] = useState(null); 
console.log(podcasts)
  const deletePodcastById = async (podcastId) => {
    try {
      setDeletingId(podcastId); 
      const url = `${BASE_URL}/podcast/${podcastId}`;
      const res = await axios.delete(url, { withCredentials: true });

      if (res.data?.success) {
        fetchProjectById();
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete podcast");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="w-[96%] shadow-lg hover:shadow-xl p-4 rounded-md mx-3 transition-all">
      {podcasts.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-5 text-center">
          <CloudUpload size={90} className="text-[#7E22CE]" />
          <h1 className="font-semibold text-[#49454F] text-md">
            Select a file or drag and drop here (Podcast Media or Transcription
            Text)
          </h1>
          <p className="text-[#00000066]">
            MP4, MOV, MP3, WAV, PDF, DOCX or TXT file{" "}
          </p>
          <Button
            onClick={() => setOpen(true)}
            className="border-1 rounde-md bg-white  text-[#7E22CE] border-[#7E22CE] hover:bg-white"
          >
            Upload Podcast
          </Button>
        </div>
      ) : (
        <div>
          <h1 className="font-bold text-lg">Your Podcasts</h1>
          <Table>
            <TableHeader>
              <TableRow className="bg-[#EDEDED] rounded-md hover:bg-[#EDEDED]">
                <TableHead className="w-[100px]">No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Upload Date & Time </TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {podcasts.map((e, i) => (
                <TableRow key={e._id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>{e.name}</TableCell>
                  <TableCell>
                    {dayjs(e.updatedAt).format("DD MMM YY | HH:mm")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div>
                      <Link to={`/project/${e.projectId}/add-podcast/podcast/${e._id}`}>
                        <Button variant="outline">View</Button>
                      </Link>
                      <Button
                        variant="outline"
                        disabled={deletingId === e._id} 
                        className="text-red-500 ml-2 border-red-500 hover:text-red-500"
                        onClick={() => deletePodcastById(e._id)}
                      >
                        {deletingId === e._id ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default PodcastTable;
