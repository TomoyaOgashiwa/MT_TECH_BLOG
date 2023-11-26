import React from "react";

import { getBlogList } from "@/actions/blog/getBlogList";

import BlogCard from "@/app/(root)/[tag_id]/_components/blog-card";

const Page = async ({ params }: { params: { tag_id: string } }) => {
  const blogList = await getBlogList(params.tag_id);
  return (
    <div className="m-auto grid grid-cols-2 gap-4 pt-2 md:w-1/2">
      {blogList.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Page;
