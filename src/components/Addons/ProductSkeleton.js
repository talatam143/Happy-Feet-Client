import React from "react";
import Skeleton from "@mui/material/Skeleton";

function ProductSkeleton() {
  const count = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <Skeleton
        variant="rectangular"
        width={260}
        height={40}
        sx={{ m: "auto", mt: 2, borderRadius: 2 }}
        animation="wave"
      />
      <div className="welcomeSkeletonContainer">
        {count.map((each) => (
          <Skeleton
            key={each}
            variant="rectangular"
            width="48%"
            height={220}
            sx={{ borderRadius: 4, m: 0.4 }}
            animation="wave"
          />
        ))}
      </div>
    </>
  );
}

export default ProductSkeleton;
