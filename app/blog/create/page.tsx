import React from "react";

import prisma from "@/lib/prisma";

import MarkdownEditor from "@/components/editor/markdown-editor";

// 技術記事の新規作成
const Page = async () => {
  const tagList = await prisma.tag.findMany();
  return (
    <div>
      <MarkdownEditor tagList={tagList} />
    </div>
  );
};

export default Page;
