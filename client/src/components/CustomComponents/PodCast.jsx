import React, { useEffect, useState } from "react";
import HeaderForSm from "./HeaderForSm";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../../lib/baseurl";
import axios from "axios";
import { ArrowLeft, Loader } from "lucide-react";
import { Button } from "../ui/button";

const PodCast = () => {
  const { podcastId ,projectId} = useParams();
  const [stage, setStage] = useState("view");
  const [podcast, setPodcast] = useState(null);
  const [transcript, setTranscript] = useState("");
  const[loading,setLoading]=useState(false)

  const fetchPodcast = async () => {
    try {
      const url = `${BASE_URL}/podcast/${podcastId}`;
      const res = await axios.get(url, { withCredentials: true });

      if (res.data?.success) {
        setPodcast(res.data.podcast);
        setTranscript(res.data.podcast.transcript); 
      }
    } catch (error) {
      console.log("Error fetching podcast:", error);
    }
  };

  useEffect(() => {
    fetchPodcast();
  }, [podcastId]);

  const handleDiscard = () => {
    setTranscript(podcast.transcript);
    setStage("view");
  };

  const handleSave = async () => {
    try {
      setLoading(true)
      const url = `${BASE_URL}/podcast/${podcastId}`;
      const res = await axios.patch(
        url,
        { transcript },
        { withCredentials: true }
      );
console.log(res)
      if (res.data?.success) {
        setPodcast(res.data.podcast);
        setStage("view");
      }
    } catch (error) {
      console.log("Error updating transcript:", error);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div>
      {!podcast ? (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div>
          <HeaderForSm
            currentTab={"Add Podcast"}
            projectName={podcast.projectId.name}
          />

          <div className="px-4 mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <Link to={`/project/${projectId}/add-podcast`}>
                <div className="flex items-center gap-3 font-bold text-lg">
                  <ArrowLeft /> <h1>Edit Transcript</h1>
                </div>
              </Link>

              <div className="flex gap-2">
                {stage === "view" ? (
                  <Button onClick={() => setStage("edit")}>Edit</Button>
                ) : (
                  <>
                    <Button
                      className="bg-white border border-red-500 text-red-500 hover:bg-white"
                      onClick={handleDiscard}
                      disabled={loading}
                    >
                      Discard
                    </Button>
                    <Button disabled={loading} onClick={handleSave}>
                      <div className="flex items-center gap-2">
                        {loading && <Loader className="w-4 h-4 animate-spin" />}
                        <span>{loading ? "Saving..." : "Save"}</span>
                      </div>
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="rounded-lg shadow-sm border bg-white hover:shadow-md transition-all p-5">
              <h1 className="text-[#7E22CE] font-bold mb-4">Transcript</h1>
              {stage === "view" ? (
                <p className="whitespace-pre-wrap">{podcast.transcript}</p>
              ) : (
                <textarea
                  disabled={loading}
                  className="w-full min-h-[400px] border rounded-md p-3"
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PodCast;
