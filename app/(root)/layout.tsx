import React from "react";

import NavMenu from "@/app/(root)/_components/nav-menu";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavMenu />
      <main>{children}</main>
    </div>
  );
};

export default layout;
