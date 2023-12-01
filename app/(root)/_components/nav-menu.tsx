import React from "react";
import { cookies } from "next/headers";
import Link from "next/link";

import { Database } from "@/type/database/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserDropDownMenu from "@/app/(root)/_components/user-drop-down-menu";

const NavMenuConfig = (isLoggedIn: boolean) => [
  { title: "ホーム", value: "HOME", path: "/", isShow: true },
  { title: "トレンド", value: "TREND", path: "/trend", isShow: true },
  { title: "お気に入り記事", value: "FAVORITE", path: "/favorite", isShow: isLoggedIn },
];

export default async function NavMenu() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const isLoggedIn = session !== null;
  return (
    <div className="border-b border-black px-8 pb-0 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">METATEAM</h1>
        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <>
              <UserDropDownMenu />
              <Button type="button">
                <Link href={"/blog/create"}>投稿する</Link>
              </Button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Button>
                <Link href={"/login"}>ログイン</Link>
              </Button>
              <Button>
                <Link href={"/signup"}>新規作成</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      <Tabs defaultValue="HOME">
        <TabsList>
          {NavMenuConfig(isLoggedIn).map((menu) => (
            <React.Fragment key={menu.value}>
              {menu.isShow && (
                <TabsTrigger className="data-[state=active]:bg-sky-200" value={menu.value}>
                  <Link href={{ pathname: menu.path }}>{menu.title}</Link>
                </TabsTrigger>
              )}
            </React.Fragment>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
