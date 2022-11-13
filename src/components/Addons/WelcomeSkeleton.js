import React from "react";
import Skeleton from "@mui/material/Skeleton";

import "./Skeleton.css";

function WelcomeSkeleton() {
  const count = [0, 1, 2, 3, 4, 5,6,7,8];
  return (
    <div className="zIndexSkeleton">
    <Skeleton
        variant="rectangular"
        width="90%"
        height={170}
        sx={{ m: "auto", mt: 2,borderRadius: 2 }}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        width={260}
        height={40}
        sx={{ m: "auto", mt: 2,borderRadius: 2 }}
        animation="wave"
      />
      <div className="welcomeSkeletonContainer">
        {count.map((each) => (
          <Skeleton
            key={each}
            variant="rectangular"
            width="29%"
            height={140}
            sx={{ borderRadius: 4, m: 0.4 }}
            animation="wave"
          />
        ))}
      </div>
      <Skeleton
        variant="rectangular"
        width={260}
        height={40}
        sx={{ m: "auto", mt: 2,borderRadius: 2 }}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        width="90%"
        height={200}
        sx={{ m: "auto", mt: 2,borderRadius: 2 }}
        animation="wave"
      />
    </div>
  );
}

export default WelcomeSkeleton;
