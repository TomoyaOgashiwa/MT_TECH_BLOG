import prisma from "@/lib/prisma";

export const getBlogList = async (tagId: string) => {
  const blogList = await prisma.blog.findMany({
    where: { tagId },
    take: 20, // TODO: 一番下まで行ったら次の20行を追加で取得する処理を検討
    include: { user: true, like: true },
  });

  return blogList;
};
