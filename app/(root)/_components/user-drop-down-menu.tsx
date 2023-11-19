"use client";

import React from "react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Database } from "@/type/database/SupabaseTypes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UserCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserDropDownMenu = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserCircle2 />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={"/admin"}>
            <Button variant={"link"}>マイページ</Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant={"link"} onClick={handleSignOut}>
            ログアウト
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDownMenu;
