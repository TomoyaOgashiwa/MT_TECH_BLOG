"use server";

import prisma from "@/lib/prisma";

type PostBlogProps = {
  title: string;
  tagId: string;
  contents: string;
};

// TODO: 応急処置でuserIdはSupabaseに登録されているものをベタがきしたもの。実際はlibフォルダにあるsafe-actionを使用して取得すること。
export const postBlog = async ({ title, tagId, contents }: PostBlogProps) => {
  try {
    await prisma.blog.create({
      data: { title, tagId, contents, userId: "c38d0688-4523-4129-9f0f-80defca3033a" },
    });
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
};
