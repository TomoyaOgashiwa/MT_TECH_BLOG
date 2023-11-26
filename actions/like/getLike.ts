import prisma from "@/lib/prisma";

// ブログのお気に入り数のGet処理
export const getLikeCount = async (blogId: string) => {
  const likeCount = await prisma.like.count({
    where: { blogId },
  });

  return likeCount;
};
