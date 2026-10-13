"use client";
import DefaultButton from "@/components/ui/Button/DefaultButton";
import { Modal } from "@/components/ui/Modal";
import { authClient } from "@/lib/auth-client";
import { IoLogoGithub, IoPersonOutline } from "react-icons/io5";

export function AuthButton() {
  const { data: session, isPending } = authClient.useSession();

  // if (isPending) return null;

  return session ? (
    <div className="flex gap-2">
      <DefaultButton href="/account" iconStart={<IoPersonOutline />}>
        Moje konto
      </DefaultButton>
      <Modal
        trigger="Wyloguj się"
        message="Czy na pewno chcesz się wylogować?"
        confirmLabel="Wyloguj"
        action={async () => {
          await authClient.signOut();
        }}
      />
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
