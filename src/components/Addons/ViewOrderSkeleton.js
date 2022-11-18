import { Skeleton } from "@mui/material";

import React from "react";

function ViewOrderSkeleton() {
  return (
    <div>
      <Skeleton
        variant="rectangular"
        width="95%"
        height={140}
        sx={{ borderRadius: 2, m: "auto", mb: 1 }}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={180}
        sx={{ mb: 1 }}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={300}
        sx={{ mb: 1 }}
        animation="wave"
      />

      <Skeleton
        variant="rectangular"
        width="95%"
        height={180}
        sx={{ borderRadius: 2, m: "auto", mb: 1 }}
        animation="wave"
      />
    </div>
  );
}

export default ViewOrderSkeleton;
