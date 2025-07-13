import React, { ReactNode } from "react";

import GreenCheckIcon from "@/assets/icons/green-check.icon";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  description?: string;
  data?: Array<{
    id: string;
    bold?: string;
    normal?: string;
    points?: string[];
  }>;
  children?: ReactNode;
  className?: {
    container?: string;
    title?: string;
    description?: string;
    dataContainer?: string;
    dataListItem?: string;
    pointsContainer?: string;
    pointsListItem?: string;
  };
}

const ListView: React.FC<Props> = ({
  title,
  description,
  data,
  children,
  className,
}) => {
  return (
    <article
      className={cn("mx-auto max-w-5xl space-y-3", className?.container)}
    >
      <div className="space-y-0.5">
        <h3 className={cn("text-2xl font-semibold", className?.title)}>
          {title}
        </h3>
        {description && (
          <p
            className={cn(
              "font-medium text-secondary-foreground",
              className?.description
            )}
          >
            {description}
          </p>
        )}
      </div>

      <ul className={cn("space-y-2.5", className?.dataContainer)}>
        {data &&
          data?.length > 0 &&
          data.map(({ bold, normal, points, id }) => (
            <li key={id}>
              <div className="flex items-start gap-1">
                <GreenCheckIcon className="mt-1 min-w-4 max-w-4" />
                <p className={cn("text-base", className?.dataListItem)}>
                  <span>
                    {bold && <b className="font-semibold">{bold}:&nbsp;</b>}
                    {normal && <span>{normal}</span>}
                  </span>
                </p>
              </div>
              {points && points.length > 0 && (
                <ol className={cn("ml-10 mt-1.5", className?.pointsContainer)}>
                  {points.map((point) => (
                    <li
                      className={cn("list-decimal", className?.pointsListItem)}
                      key={`${id}-${point}`}
                    >
                      {point}
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ))}
      </ul>
      {children}
    </article>
  );
};

export default ListView;
