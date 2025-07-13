"use client";

import dynamic from "next/dynamic";

import { useIsMobile } from "@/hooks/use-mobile";

const SplashCursor = dynamic(
  () => import("@/components/shared/splash-cursor"),
  {
    ssr: false,
  }
);

const CursorAnimation = () => {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return <SplashCursor />;
};

export default CursorAnimation;
