"use client";

import { useEffect, useState } from "react";

const HydrationProtect = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return <div>{children}</div>;
};

export default HydrationProtect;
