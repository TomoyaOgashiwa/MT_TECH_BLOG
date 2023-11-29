"use client";

import { useState } from "react";

import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import "katex/dist/katex.min.css";

// 技術記事の新規作成
const Page = () => {
  const [title, setTitle] = useState("");
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const predefinedTags = ["aaaa", "bbbb", "cccc"];

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleTagChange = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleNewTagChange = (e) => {
    setNewTag(e.target.value);
  };

  const addNewTag = () => {
    if (newTag && !predefinedTags.includes(newTag) && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const renderTagSelection = () => {
    return predefinedTags.map((tag) => (
      <button key={tag} className="m-1 p-1 border border-gray-300 rounded" onClick={() => handleTagChange(tag)}>
        {tag}
      </button>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">新規記事作成</h1>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="タイトルを入力"
        value={title}
        onChange={handleTitleChange}
      />
      <div className="mb-4">
        <div className="mb-2">タグ:</div>
        {renderTagSelection()}
        <div>
          <input
            type="text"
            className="m-1 p-1 border border-gray-300 rounded"
            placeholder="新しいタグを入力"
            value={newTag}
            onChange={handleNewTagChange}
          />
          <button className="p-1 border border-gray-300 rounded" onClick={addNewTag}>
            タグを追加
          </button>
        </div>
        <div>選択したタグ: {tags.join(", ")}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            rows="15"
            placeholder="ここにMarkdownで記事を書いてください"
            value={input}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="border border-gray-300 p-2 rounded">
          <ReactMarkdown className="prose" remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
            {input}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Page;
