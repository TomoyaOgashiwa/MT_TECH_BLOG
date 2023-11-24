import React from "react";

const Page = ({ params }: { params: { tag_id: string } }) => {
  console.log(params);
  return <div>Page</div>;
};

export default Page;
