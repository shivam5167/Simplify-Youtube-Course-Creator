"use client";

import React, { PropsWithChildren, useCallback } from "react";

import { LogInIcon } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { parseAsBoolean, useQueryState } from "nuqs";

import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import { Button, ButtonVariants } from "../ui/button";

interface LoginButtonProps extends ButtonVariants, PropsWithChildren {
  className?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  children,
  className,
  ...props
}) => {
  const session = useSession();
  const router = useRouter();
  const [_, setIsLoginDialogOpen] = useQueryState(
    "login-dialog",
    parseAsBoolean.withDefault(false)
  );

  const handleLogin = useCallback(() => {
    if (session.data?.session) {
      router.push("/dashboard");
    } else {
      setIsLoginDialogOpen((prev) => !prev);
    }
  }, [router, session.data?.session, setIsLoginDialogOpen]);

  return (
    <Button
      className={cn("justify-start gap-1.5", className)}
      onClick={handleLogin}
      size={"sm"}
      {...props}
    >
      {children ? (
        children
      ) : (
        <>
          <LogInIcon size={16} strokeWidth={2} className="opacity-80" />
          Login
        </>
      )}
    </Button>
  );
};

export default LoginButton;
