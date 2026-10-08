"use client";
import DefaultButton from "@/components/ui/Button/DefaultButton";
import { authClient } from "@/lib/auth-client";
import { IoLogoGithub, IoLogOutOutline } from "react-icons/io5";

export function AuthButton() {
  const { data: session, isPending } = authClient.useSession();

  // if (isPending) return null;

  return session ? (
    <DefaultButton
      iconStart={<IoLogOutOutline />}
      onClick={() => authClient.signOut()}
    >
      Wyloguj się
    </DefaultButton>
  ) : (
    <DefaultButton
      iconStart={<IoLogoGithub />}
      onClick={() => authClient.signIn.social({ provider: "github" })}
      // disabled={isPending}
    >
      Zaloguj przez GitHub
    </DefaultButton>
  );
}
