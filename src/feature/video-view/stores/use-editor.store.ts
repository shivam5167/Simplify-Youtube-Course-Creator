import { type YouTubePlayer } from "react-youtube";
import { createStore } from "zustand/vanilla";

export type VideoPlayState = {
  player: YouTubePlayer | undefined;
  videoPlayerHeight?: number;
  activeVideoTitle?: string;
};

export type VideoPlayActions = {
  setPlayer: (player: YouTubePlayer) => void;
  setVideoPlayerHeight: (height: number) => void;
  setActiveVideoTitle: (title: string) => void;
};

export type VideoPlayerStore = VideoPlayActions & VideoPlayState;

export const defaultInitState: VideoPlayerStore = {
  setPlayer: () => {},
  player: undefined,
  videoPlayerHeight: undefined,
  setVideoPlayerHeight: () => {},
  activeVideoTitle: "",
  setActiveVideoTitle: () => {},
};

export const createVideoPlayerStore = (
  initState: VideoPlayerStore = defaultInitState
) => {
  return createStore<VideoPlayerStore>()((set) => ({
    ...initState,
    setPlayer: (player: YouTubePlayer) => set({ player: player }),
    setVideoPlayerHeight: (height: number) =>
      set({ videoPlayerHeight: height }),
    setActiveVideoTitle: (title: string) => set({ activeVideoTitle: title }),
  }));
};
