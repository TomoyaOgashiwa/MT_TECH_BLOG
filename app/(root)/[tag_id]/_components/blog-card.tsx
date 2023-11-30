import React from "react";
import Link from "next/link";

import { getLikeCount } from "@/actions/like/get-like";
import type { Blog, User } from "@prisma/client";
import { Star } from "lucide-react";

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

type BlogIncludeUser = Blog & { user: User };

const BlogCard = async ({ blog }: { blog: BlogIncludeUser }) => {
  const likeCount = await getLikeCount(blog.id);
  return (
    <Link key={blog.id} href={{ pathname: `/blog/${blog.id}` }}>
      <Card className="bg-ring grid min-h-[100px] items-center px-4 py-2 text-white">
        <CardContent>
          <CardTitle>{blog.title}</CardTitle>
        </CardContent>
        <CardFooter className="flex">
          <div className="flex justify-around">
            <Star />
            <p>{likeCount}</p>
          </div>
          <p>{blog.user.name}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;
