import React from "react";
import Skeleton from "@mui/material/Skeleton";

import "./Skeleton.css";

function CartSkeleton() {
  const count = [0, 1, 2];
  return (
      <div className="zIndexSkeletonCart" style={{ marginTop: "70px"}}>
        {count.map((each) => (
          <Skeleton
            key={each}
            variant="rectangular"
            width="95%"
            height={140}
            sx={{ borderRadius: 1, m: 0.4 }}
            animation="wave"
          />
        ))}
        <Skeleton
          variant="rectangular"
          width="100%"
          height={40}
          sx={{ mt: 1 }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="94%"
          height={300}
          sx={{ borderRadius: 5,mt: 1 }}
          animation="wave"
        />
      </div>
  );
}

export default CartSkeleton;
