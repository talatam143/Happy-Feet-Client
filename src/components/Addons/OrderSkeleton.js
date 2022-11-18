import { Skeleton } from "@mui/material";

import React from "react";

function OrderSkeleton() {
  const len = [0, 1, 2, 3, 4];
  return (
    <div>
      {len.map((eachSkull) => (
        <Skeleton
          variant="rectangular"
          width="95%"
          height={140}
          sx={{ borderRadius: 2, m: "auto", mb: 1 }}
          animation="wave"
          key={eachSkull}
        />
      ))}
    </div>
  );
}

export default OrderSkeleton;
