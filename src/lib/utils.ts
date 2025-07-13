import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function extractPlaylistIdFromURL(url: string) {
  const regex = /[?&]list=([^#\&\?]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function formatCount(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  } else if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  } else {
    return count.toString();
  }
}

export function secondsToTimestamp(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formattedHrs = hrs.toString().padStart(2, "0");
  const formattedMins = mins.toString().padStart(2, "0");
  const formattedSecs = secs.toString().padStart(2, "0");

  return `${formattedHrs}:${formattedMins}:${formattedSecs}`;
}

export const convertTimestampToSeconds = (timestamp: string): number => {
  try {
    const cleanTimestamp = timestamp.replace(/[\[\]\s]/g, "");
    const parts = cleanTimestamp.split(":").reverse();
    return parts.reduce((acc, part, index) => {
      return acc + parseInt(part) * Math.pow(60, index);
    }, 0);
  } catch (error) {
    console.error("Error converting timestamp:", error);
    return 0;
  }
};
