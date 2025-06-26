import axios from "axios";
import { BASE_URL } from "../../../lib/baseurl";
import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import HeaderForSm from "./HeaderForSm";
import { File, Upload, UploadCloud, Youtube } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner";
import PodcastTable from "./PodcastTable";
const AddTypes = [
  {
    name: "RSS FEED",
    para: "Import your podcast using an RSS feed URL. Ideal if you're migrating from another platform.",
    icon: <Upload />,
  },
  {
    name: "YouTube Video",
    para: "Convert your YouTube videos into audio podcasts effortlessly. Just paste a YouTube link.",
    icon: <UploadCloud/>,
  },
  {
    name: "Upload Files",
    para: "Upload audio or video files directly from your device to create a new podcast episode.",
    icon: <File />,
  },
];
const AddPodcast = () => {
  const [loading,setLoading]=useState(false)
  const [data, setData] = useState(null);
  const[open,setOpen]=useState(false)
  const { projectId ,podcastId} = useParams();
  const[formData,setFormData]=useState({
    name:"",
    transcript:""
  })

  const fetchProjectById = async () => {
    try {
      const url = `${BASE_URL}/podcast/${projectId}/get-all`;
      const res = await axios.get(url, { withCredentials: true });
      console.log(res.data);
      if (res.data?.success) {
      console.log(res.data)
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const AddPodcastToProject=async()=>{
    try {
      setLoading(true)
  
      const url=`${BASE_URL}/podcast/${projectId}`
console.log(formData)
      const res=await axios.post(url,formData,{withCredentials:true})
    
      if(res.data?.success){
        toast.success(res.data.message)
        fetchProjectById()
      }
      setOpen(false)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }finally{
      setFormData({
        name: "",
        transcript: "",
      });
      setLoading(false)
    }
  }

 
  useEffect(() => {
    fetchProjectById();
  }, [projectId]);
const HandleOnchange=(e,name)=>{
  setFormData((prev)=>({...prev, [name]:e.target.value}))
}
if(podcastId){
  return <Outlet/>
}

  return (
    <div>
      {!data ? (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div>
          <HeaderForSm
            projectName={data.project?.name}
            currentTab="Add Podcast"
          />
          <div className="px-4 flex-col items-center  mt-4">
            <h1 className="font-bold text-2xl">Add Podcast</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 my-4 p-2">
            {AddTypes.map((item, index) => (
              <div
                onClick={() => setOpen(true)}
                key={index}
                className="flex hover:cursor-pointer justify-between items-center lg:max-w-[340px] m-1 mb-4 px-4 py-6 rounded-lg shadow-sm border bg-white hover:shadow-md transition-all"
              >
                <div>
                  <h1 className="text-lg font-semibold text-black">
                    {item.name}
                  </h1>
                  <p className="text-sm text-[#646464]">{item.para}</p>
                </div>

                <div className="bg-purple-100 p-3  text-[#7E22CE] rounded-md">{item.icon}</div>
              </div>
            ))}
          </div>
          <PodcastTable fetchProjectById={fetchProjectById} setOpen={setOpen}  podcasts={data.podcasts}/>
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex-col justify-start text-left space-y-4">
                <div className="font-bold flex items-center gap-4 text-black text-2xl">
                  <span>
                    <Upload />
                  </span>
                  <h1>Upload From Youtube</h1>
                </div>
                <Label>Name</Label>
                <Input
                  onChange={(e) => HandleOnchange(e, "name")}
                  name="name"
                  value={formData.name}
                />
                <Label>Transcript</Label>
                <Input
                  onChange={(e) => HandleOnchange(e, "transcript")}
                  name="transcript"
                  value={formData.transcript}
                />
                <div className="flex justify-end">
                  <Button onClick={AddPodcastToProject} disabled={loading}>
                    Upload
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPodcast;
