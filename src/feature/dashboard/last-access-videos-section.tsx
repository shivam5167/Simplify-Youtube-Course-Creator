import { api } from "@/trpc/server";

import VideoCard from "./component/video-card";

const LastAccessedVideoSection = async () => {
  const videos = await api.dashboard.lastAccessVideos();

  if (videos.length === 0) {
    return (
      <div className="mt-4">
        <div>
          <h3 className="text-lg font-medium text-muted-foreground">
            Last accessed videos
          </h3>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-4">
          <p>No videos found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 w-full">
      <div>
        <h3 className="text-lg font-medium text-muted-foreground">
          Last accessed videos
        </h3>
      </div>

      <ul className="mt-4 grid grid-cols-1 gap-x-4 gap-y-2.5 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[repeat(5_,_auto)]">
        {videos.map((videoDetail) => (
          <VideoCard key={videoDetail.id} videoDetail={videoDetail} />
        ))}
      </ul>
    </div>
  );
};

export default LastAccessedVideoSection;
