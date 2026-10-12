"use client";
import DefaultButton from "@/components/ui/Button/DefaultButton";
import { authClient } from "@/lib/auth-client";
import {
  IoLogoGithub,
  IoLogOutOutline,
  IoPersonOutline,
} from "react-icons/io5";

export function AuthButton() {
  const { data: session, isPending } = authClient.useSession();

  // if (isPending) return null;

  return session ? (
    <div className="flex gap-2">
      <DefaultButton href="/account" iconStart={<IoPersonOutline />}>
        Moje konto
      </DefaultButton>
      <DefaultButton
        iconStart={<IoLogOutOutline />}
        onClick={() => authClient.signOut()}
      >
        Wyloguj się
      </DefaultButton>
    </div>
  ) : (
    <DefaultButton
      iconStart={<IoLogoGithub />}
      onClick={() => authClient.signIn.social({ provider: "github" })}
    >
      Zaloguj przez GitHub
    </DefaultButton>
  );
}
