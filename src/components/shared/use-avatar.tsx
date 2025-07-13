import Link from "next/link";
import React from "react";

import { cn, formatCount } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { buttonVariants } from "../ui/button";

interface Props {
  title: string;
  avatar: string;
  className?: string;
  count?: number;
  customUrl: string;
}

const UserAvatar: React.FC<Props> = ({ title, avatar, count, customUrl }) => {
  return (
    <div className="flex items-start space-x-2">
      <div className="relative size-fit">
        <Avatar>
          <AvatarImage src={avatar} alt={title} />
          <AvatarFallback>{title.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="absolute -end-1 -top-1">
          <span className="sr-only">Verified</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              className="fill-background"
              d="M3.046 8.277A4.402 4.402 0 0 1 8.303 3.03a4.4 4.4 0 0 1 7.411 0 4.397 4.397 0 0 1 5.19 3.068c.207.713.23 1.466.067 2.19a4.4 4.4 0 0 1 0 7.415 4.403 4.403 0 0 1-3.06 5.187 4.398 4.398 0 0 1-2.186.072 4.398 4.398 0 0 1-7.422 0 4.398 4.398 0 0 1-5.257-5.248 4.4 4.4 0 0 1 0-7.437Z"
            />
            <path
              className="fill-primary"
              d="M4.674 8.954a3.602 3.602 0 0 1 4.301-4.293 3.6 3.6 0 0 1 6.064 0 3.598 3.598 0 0 1 4.3 4.302 3.6 3.6 0 0 1 0 6.067 3.6 3.6 0 0 1-4.29 4.302 3.6 3.6 0 0 1-6.074 0 3.598 3.598 0 0 1-4.3-4.293 3.6 3.6 0 0 1 0-6.085Z"
            />
            <path
              className="fill-background"
              d="M15.707 9.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414L11 12.586l3.293-3.293a1 1 0 0 1 1.414 0Z"
            />
          </svg>
        </span>
      </div>
      <div>
        <Link
          href={customUrl}
          target="_blank"
          className="font-medium hover:underline"
        >
          {title}
        </Link>
        {count && (
          <p className="text-sm text-gray-500">
            {formatCount(count)} subscribers &bull; (
            <Link
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
                "h-auto p-0 font-normal text-foreground/50"
              )}
              href={customUrl}
              target="_blank"
            >
              Subscribe
            </Link>
            )
          </p>
        )}
      </div>
    </div>
  );
};

export default UserAvatar;
