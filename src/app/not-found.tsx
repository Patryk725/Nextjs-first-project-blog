"use client";
import DefaultButton from "@/components/ui/Button/DefaultButton";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="absolute top-1/2 left-1/2 mx-auto flex translate-[-50%] flex-col items-center justify-center gap-8 py-10">
      <div className="w-full">
        <img width="404" src="https://http.cat/404" alt="404" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-bold">Niestety, nie odnaleziono szukanej strony</h2>
        <p>Upewnij się, że wpisałe/aś adres poprawnie.</p>
      </div>
      <div className="flex gap-4">
        <DefaultButton onClick={() => router.back()}>Wróć</DefaultButton>
        <DefaultButton onClick={() => router.push("/")}>
          Strona główna
        </DefaultButton>
      </div>
    </div>
  );
}
