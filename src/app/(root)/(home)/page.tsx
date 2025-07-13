import { Metadata } from "next";
import nextDynamic from "next/dynamic";

import { DotPattern } from "@/components/ui/dot-pattern";
import { clientEnv } from "@/env/client";
import CreateCourseForm from "@/feature/create-course/component/create-course-form";
import CursorAnimation from "@/feature/home/components/cursor-animation";
import { FAQSectionSkeleton } from "@/feature/home/components/faq";
import HeroSection from "@/feature/home/components/hero-section";
import WhyToChooseUs from "@/feature/home/components/why-to-choose-us";

const FAQSection = nextDynamic(() => import("@/feature/home/components/faq"), {
  loading: () => <FAQSectionSkeleton />,
});

export const metadata: Metadata = {
  title: "Simplify - Transform YouTube Content into Structured Online Courses",
  description:
    "Transform your YouTube videos into professional online courses. Organize content, create structured learning paths, and monetize your knowledge with our easy-to-use platform.",
  keywords:
    "youtube course creator, video course platform, youtube content transformation, online course creation, educational content monetization, content restructuring, video learning platform, youtube educator tools, course organization platform, online teaching platform, video content management, youtube channel to course",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL(clientEnv.NEXT_PUBLIC_BETTER_AUTH_URL),
  alternates: {
    canonical: "/",
  },
  category: "education",
  openGraph: {
    title:
      "Simplify - Transform YouTube Content into Structured Online Courses",
    description:
      "Transform your YouTube videos into professional online courses. Create structured learning paths and monetize your content.",
    type: "website",
    images: ["/images/hero-thumbnail.png"],
    locale: "en_US",
    siteName: "Simplify",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simplify - Create and Share Online Courses",
    description:
      "Transform your YouTube videos into professional online courses. Create structured learning paths and monetize your content.",
    images: ["/images/hero-thumbnail.png"],
    creator: "@simplify",
    site: "@simplify",
  },
};

const Page = () => {
  return (
    <div className="relative size-full">
      <DotPattern />
      <HeroSection />
      <WhyToChooseUs />
      <FAQSection />
      <CursorAnimation />
      <CreateCourseForm showTrigger={false} />
    </div>
  );
};

export default Page;
