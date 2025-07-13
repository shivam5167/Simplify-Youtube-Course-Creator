import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const GreenCheckIcon: React.FC<Props> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <g data-name="Layer 2">
        <circle cx="12" cy="12" r="9.75" fill="#66bb6a" />
        <path
          fill="#fff"
          d="M11,15.25a.74.74,0,0,1-.53-.22l-3-3A.75.75,0,0,1,8.53,11L11,13.44,15.47,9A.75.75,0,0,1,16.53,10l-5,5A.74.74,0,0,1,11,15.25Z"
        />
      </g>
    </svg>
  );
};

export default GreenCheckIcon;
