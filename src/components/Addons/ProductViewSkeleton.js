import React from "react";
import Skeleton from "@mui/material/Skeleton";

import "./Skeleton.css";

const count = [0, 1, 2, 3, 4];

function ProductViewSkeleton() {
  return (
    <div className="zIndexSkeletonCart">
      <Skeleton
        variant="rectangular"
        width="95%"
        height={400}
        sx={{ borderRadius: 4, mt: 4 }}
        animation="wave"
      />
      <div style={{ display: "flex", marginTop: "10px", width:"95%" }}>
        {count.map((each) => (
          <Skeleton
            key={each}
            variant="rectangular"
            width="70px"
            height={80}
            sx={{ borderRadius: 1, m: 0.4 }}
            animation="wave"
          />
        ))}
      </div>
      <Skeleton
        variant="rectangular"
        width="93%"
        height={40}
        sx={{ borderRadius: 2, mt: 2 }}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        width="200px"
        height={40}
        sx={{ borderRadius: 2, mt: 3, ml: 2, alignSelf: "flex-start" }}
        animation="wave"
      />
      <div style={{ display: "flex", marginTop: "10px" }}>
        {count.map((each) => (
          <Skeleton
            key={each}
            variant="rectangular"
            width="60px"
            height={60}
            sx={{ borderRadius: 4, m: 0.4 }}
            animation="wave"
          />
        ))}
      </div>
      <Skeleton
        variant="rectangular"
        width="93%"
        height={40}
        sx={{ borderRadius: 2, mt: 2 }}
        animation="wave"
      />
    </div>
  );
}

export default ProductViewSkeleton;
