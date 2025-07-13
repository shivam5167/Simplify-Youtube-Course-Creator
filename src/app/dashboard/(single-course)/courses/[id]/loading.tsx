import { VideoNotesLoadingSkeleton } from "@/feature/notes/components/video-notes";
import { EnrolledCourseSkeleton } from "@/feature/video-view/components/loader";

const DashboardLayoutSkeleton = () => {
  return (
    <div className="container pb-6">
      <EnrolledCourseSkeleton showTab={true} />
      <div>
        <VideoNotesLoadingSkeleton />
      </div>
    </div>
  );
};

export default DashboardLayoutSkeleton;
