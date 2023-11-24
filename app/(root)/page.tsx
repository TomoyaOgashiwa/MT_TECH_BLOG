import React from "react";
import Link from "next/link";

import prisma from "@/lib/prisma";

import { Card, CardTitle } from "@/components/ui/card";

const Page = async () => {
  const tagList = await prisma.tag.findMany();
  return (
    <div className="m-auto grid grid-cols-2 gap-4 pt-2 md:w-1/2">
      {tagList.map((tag) => (
        <Link key={tag.id} href={`/${tag.id}`}>
          <Card className="bg-ring grid min-h-[100px] items-center p-4 text-white">
            <CardTitle>{tag.name}</CardTitle>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Page;
