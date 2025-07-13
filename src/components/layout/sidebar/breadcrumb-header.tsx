"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

const linkMapping = {
  "": "Home",
  dashboard: "Dashboard",
  settings: "Settings",
  profile: "Profile",
  courses: "Courses",
  "edit-course": "Edit Course",
} as const;

const BreadCrumbHeader: React.FC = () => {
  const pathname = usePathname();

  const crumbs = pathname.split("/");
  const crumbsLength = crumbs.length;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => {
          const link = crumbs.slice(0, index + 1).join("/");

          const crumbItem = linkMapping[crumb as keyof typeof linkMapping];

          const isUUID =
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
              crumb
            );

          if (isUUID && index !== crumbsLength - 1) {
            return (
              <Fragment key={crumb}>
                <BreadcrumbItem className="hidden md:block" key={crumb}>
                  <BreadcrumbLink href={`/${link}`}>
                    Video Playing
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </Fragment>
            );
          }

          if (crumbItem && index !== crumbsLength - 1) {
            return (
              <Fragment key={crumb}>
                <BreadcrumbItem className="hidden md:block" key={crumb}>
                  <BreadcrumbLink href={`/${link}`}>{crumbItem}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </Fragment>
            );
          }

          if (crumbItem && index === crumbsLength - 1) {
            return (
              <BreadcrumbItem key={crumb}>
                <BreadcrumbPage>{crumbItem}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }
          if (isUUID && index === crumbsLength - 1) {
            return (
              <BreadcrumbItem key={crumb}>
                <BreadcrumbPage>Video Playing</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }

          return null;
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export const BreadCrumbHeaderLoader = () => {
  return (
    <div className="flex items-center gap-3 p-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton className="h-7 w-16" key={index} />
      ))}
    </div>
  );
};

export default BreadCrumbHeader;
