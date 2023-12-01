"use client";

import { useState } from "react";

import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import "katex/dist/katex.min.css";

import { useRouter } from "next/navigation";

import { postBlog } from "@/actions/blog/post-blog";

import { Button } from "@/components/ui/button";

import { useToast } from "../ui/use-toast";

type Props = {
  tagList: { id: string; name: string }[];
};

// 技術記事の新規作成
const MarkdownEditor: React.FC<Props> = ({ tagList }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [input, setInput] = useState("");
  const [tagInfo, setTagInfo] = useState({ name: "", id: "" });

  const handlePostBlog = async () => {
    try {
      await postBlog({ title, tagId: tagInfo.id, contents: input });
      toast({
        title: "投稿完了しました",
        variant: "default",
        duration: 3000,
      });
      router.refresh();
      router.push("/");
    } catch (error) {
      toast({
        title: "投稿失敗しました",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold">新規記事作成</h1>
        <Button onClick={handlePostBlog}>投稿</Button>
      </div>
      <input
        type="text"
        className="mb-4 w-full rounded border border-gray-300 p-2"
        placeholder="タイトルを入力"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="mb-4">
        <div className="mb-2">タグ:</div>
        {tagList.map((tag) => (
          <button key={tag.id} className="m-1 rounded border border-gray-300 p-1" onClick={() => setTagInfo(tag)}>
            {tag.name}
          </button>
        ))}
        <div>選択したタグ: {tagInfo.name}</div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <textarea
            className="w-full rounded border border-gray-300 p-2"
            rows={15}
            placeholder="ここにMarkdownで記事を書いてください"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="rounded border border-gray-300 p-2">
          <ReactMarkdown className="prose" remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
            {input}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
