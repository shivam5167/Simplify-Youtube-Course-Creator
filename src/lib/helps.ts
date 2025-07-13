import "server-only";

import { env } from "@/env/server";
import {
  ChannelAuthorResponseType,
  PlaylistItemsResponseType,
  PlaylistResponseType,
  ThumbnailType,
} from "@/types/youtube.type";

const playlistURLConstructor = (playlistId: string) => {
  return `https://www.googleapis.com/youtube/v3/playlists?key=${env.YOUTUBE_API_KEY}&part=snippet&fields=items/snippet(localized,channelTitle,publishedAt,thumbnails,channelId)&id=${playlistId}`;
};

const playlistItemsURLConstructor = (
  playlistId: string,
  nextToken?: string
) => {
  if (nextToken) {
    return `https://www.googleapis.com/youtube/v3/playlistItems?key=${env.YOUTUBE_API_KEY}&part=snippet&fields=items(snippet(title,publishedAt,description,thumbnails,resourceId(videoId))),nextPageToken&playlistId=${playlistId}&maxResults=50&pageToken=${nextToken}`;
  }

  return `https://www.googleapis.com/youtube/v3/playlistItems?key=${env.YOUTUBE_API_KEY}&part=snippet&fields=items(snippet(title,publishedAt,description,thumbnails,resourceId(videoId))),nextPageToken&playlistId=${playlistId}&maxResults=50`;
};

const channelInfoURLConstructor = (channelId: string) => {
  return `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&fields=items(id,snippet(title,publishedAt,description,thumbnails,customUrl),statistics(subscriberCount))&id=${channelId}&key=${env.YOUTUBE_API_KEY}`;
};

export const playlistFetcher = async (
  playlistId: string
): Promise<PlaylistResponseType> => {
  return await fetch(playlistURLConstructor(playlistId), {
    method: "GET",
  }).then((res) => res.json());
};

export const playlistItemsFetcher = async (
  playlistId: string,
  nextToken?: string
): Promise<PlaylistItemsResponseType> => {
  return await fetch(playlistItemsURLConstructor(playlistId, nextToken), {
    method: "GET",
  }).then((res) => res.json());
};

export const channelInfoFetcher = async (
  channelId: string
): Promise<ChannelAuthorResponseType> => {
  return await fetch(channelInfoURLConstructor(channelId), {
    method: "GET",
  }).then((res) => res.json());
};

// get the videoImage from the youtube res
export const getVideoThumbnail = (data: ThumbnailType) => {
  if (data?.maxres) {
    return data.maxres;
  }
  if (data.standard) {
    return data.standard;
  }
  if (data.high) {
    return data.high;
  }
  if (data.medium) {
    return data.medium;
  }
  if (data.default) {
    return data.default;
  }
  return null;
};
