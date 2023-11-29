import React, { FC } from "react";
import "./css/loader.css";

const Loader: FC = () => {
  const rects = Array(2).fill(null);

  const renderRects = (transform: string, className: string) => (
    <>
      <rect
        height={40}
        width={40}
        ry={20}
        rx={20}
        transform={transform}
        className={className}
      />
      <rect
        transform={`translate(0,48) ${transform}`}
        height={40}
        width={40}
        ry={20}
        rx={20}
        className={className}
      />
    </>
  );

  return (
    <main className="animate-pulse">
      <div className="animate-spin">
        <svg height="128px" width="128px" viewBox="0 0 128 128" className="pl1">
          <defs>
            <linearGradient y2={1} x2={1} y1={0} x1={0} id="pl-grad">
              <stop stopColor="#000" offset="0%" />
              <stop stopColor="#fff" offset="100%" />
            </linearGradient>
            <mask id="pl-mask">
              <rect fill="url(#pl-grad)" height={128} width={128} y={0} x={0} />
            </mask>
          </defs>
          <g fill="var(--primary)">
            <g className="pl1__g">
              <g transform="translate(20,20) rotate(0,44,44)">
                <g className="pl1__rect-g">{renderRects("", "pl1__rect")}</g>
                <g transform="rotate(180,44,44)" className="pl1__rect-g">
                  {renderRects("", "pl1__rect")}
                </g>
              </g>
            </g>
          </g>
          <g mask="url(#pl-mask)" fill="#1E5236">
            <g className="pl1__g">
              <g transform="translate(20,20) rotate(0,44,44)">
                <g className="pl1__rect-g">{renderRects("", "pl1__rect")}</g>
                <g transform="rotate(180,44,44)" className="pl1__rect-g">
                  {renderRects("", "pl1__rect")}
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </main>
  );
};

export default Loader;
