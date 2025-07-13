"use client";

import { LogOutIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  return (
    <Button
      onClick={handleLogout}
      className="h-9 w-full justify-start gap-1.5 px-3"
      variant={"ghost"}
    >
      <DropdownMenuShortcut className="ml-0">
        <LogOutIcon size={16} strokeWidth={2} />
      </DropdownMenuShortcut>
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;
