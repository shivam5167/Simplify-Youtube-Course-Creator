import Image from "next/image";

import SpotlightCard from "@/components/shared/spotlight-card";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const WhyToChooseUs = () => {
  return (
    <div className="container pb-20 pt-10">
      <div className="flex flex-col items-center space-y-2">
        <h3 className="text-3xl font-semibold md:text-5xl">How it works</h3>
        <p className="max-w-screen-sm text-center text-sm text-muted-foreground md:text-base">
          Here is a comprehensive guide on how to use the platform. If you have
          any questions or need assistance, feel free to reach out to our
          support team.
        </p>
      </div>
      <ul className="mt-8 grid grid-cols-1 gap-x-4 gap-y-2.5 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[repeat(3_,_auto)]">
        <SpotlightCard className="grid grid-rows-subgrid [grid-row:span_3]">
          <CardHeader className="space-y-0 pb-2">
            <Image
              src={"/images/playlist.png"}
              width={100}
              height={100}
              alt="import playlist"
              className="mb-3 size-8 md:size-12"
            />

            <CardTitle>Step 1: Import your YouTube playlist</CardTitle>
            <CardDescription>Simply paste your YouTube link</CardDescription>
          </CardHeader>
          <CardContent>
            Start by pasting the link of your favorite YouTube playlist into our
            platform. Our system automatically fetches all the videos, saving
            you the hassle of manual uploads. This is the first step toward
            turning a scattered collection of videos into a structured learning
            journey.
          </CardContent>
        </SpotlightCard>
        <SpotlightCard className="grid grid-rows-subgrid [grid-row:span_3]">
          <CardHeader className="space-y-0 pb-2">
            <Image
              src={"/images/organize.png"}
              width={100}
              height={100}
              alt="import playlist"
              className="mb-3 size-8 md:size-12"
            />

            <CardTitle>Step 2: Organize Your Lessons</CardTitle>
            <CardDescription>
              Arrange videos into a clear course structure
            </CardDescription>
          </CardHeader>
          <CardContent>
            Drag and drop the imported videos to create modules and lessons.
            Easily reorder or edit each section so your course flows logically.
            This organized layout helps you focus on learning without
            distractions and makes it simple to revisit specific topics when
            needed.
          </CardContent>
        </SpotlightCard>
        <SpotlightCard className="grid grid-rows-subgrid [grid-row:span_3]">
          <CardHeader className="space-y-0 pb-2">
            <Image
              src={"/images/learn.png"}
              width={100}
              height={100}
              alt="import playlist"
              className="mb-3 size-8 md:size-12"
            />

            <CardTitle>Step 3: Learn & Engage</CardTitle>
            <CardDescription>
              Track progress and join a community of learners
            </CardDescription>
          </CardHeader>
          <CardContent>
            Once your course is set up, dive into the content at your own pace.
            Use our progress tracker to see your advancement and interact with a
            community of like-minded learners through discussion boards and
            feedback tools. This step transforms learning from a solo activity
            into an engaging, shared experience.
          </CardContent>
        </SpotlightCard>
      </ul>
    </div>
  );
};

export default WhyToChooseUs;
