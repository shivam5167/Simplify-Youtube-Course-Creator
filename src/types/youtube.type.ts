export interface ThumbnailDimensionAndURLType {
  width: number;
  height: number;
  url: string;
}

export interface YoutubeErrorRes {
  error: {
    message: string;
    statuscode: number;
  };
}

export interface ThumbnailType {
  default: ThumbnailDimensionAndURLType;
  medium: ThumbnailDimensionAndURLType;
  high: ThumbnailDimensionAndURLType;
  standard: ThumbnailDimensionAndURLType;
  maxres: ThumbnailDimensionAndURLType;
}

export interface PlaylistSnippetType {
  publishedAt: string;
  channelId: string;
  thumbnails: ThumbnailType;
  channelTitle: string;
  localized: {
    title: string;
    description: string;
  };
}

export interface ChannelAuthorSnippetType {
  title: string;
  description: string;
  thumbnails: ThumbnailType;
  customUrl: string;
  publishedAt: string;
  subscriberCount: number;
}

export interface PlaylistItemType
  extends Pick<PlaylistSnippetType, "thumbnails" | "publishedAt"> {
  title: string;
  description: string;
  resourceId: {
    videoId: string;
  };
}

export type PlaylistResponseType =
  | {
      items: Array<{
        snippet: PlaylistSnippetType;
      }>;
    }
  | YoutubeErrorRes;

export type PlaylistItemsResponseType =
  | {
      items: Array<{
        snippet: PlaylistItemType;
      }>;
      nextPageToken?: string;
      pageInfo: {
        totalResults: number;
        resultsPerPage: number;
      };
    }
  | YoutubeErrorRes;

export type ChannelAuthorResponseType =
  | {
      items: Array<{
        id: string;
        snippet: ChannelAuthorSnippetType;
        statistics: {
          subscriberCount: number;
        };
      }>;
    }
  | YoutubeErrorRes;
