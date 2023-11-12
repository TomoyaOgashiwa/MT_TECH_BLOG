"use client";

import React from "react";
import Link from "next/link";

import { UserCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NavMenuConfig = [
  { title: "ホーム", value: "HOME", path: "/", isShow: true },
  { title: "トレンド", value: "TREND", path: "/trend", isShow: false },
  { title: "お気に入り記事", value: "FAVORITE", path: "/favorite", isShow: false },
];

const NavMenu = () => {
  // TODO: ログインしているかどうかの関数を作成すること
  const isLoggedIn = true;
  return (
    <div className="border-b border-black px-8 pb-0 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">METATEAM</h1>
        <div className="flex items-center gap-4">
          <UserCircle2 />
          {isLoggedIn && <Button>投稿する</Button>}
        </div>
      </div>
      <Tabs defaultValue="HOME">
        <TabsList>
          {NavMenuConfig.map((menu) => (
            <TabsTrigger className="data-[state=active]:bg-sky-200" key={menu.value} value={menu.value}>
              <Link href={{ pathname: menu.path }}>{menu.title}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default NavMenu;
