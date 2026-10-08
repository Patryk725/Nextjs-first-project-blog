"use client";
import DefaultButton from "@/components/ui/Button/DefaultButton";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <section>
      <div className="mx-auto flex flex-col items-center justify-center gap-8 py-10">
        <div className="select-none">
          <Image
            src="https://httpducks.com/404.jpg"
            alt="404 image"
            width={400}
            height={350}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-bold">
            Niestety, nie odnaleziono szukanej strony
          </h2>
          <p>Upewnij się, że wpisałe/aś adres poprawnie.</p>
        </div>
        <div className="flex gap-4">
          {/* <DefaultButton onClick={() => router.back()}>Wróć</DefaultButton>  */}{" "}
          {/* po zmianie butotn na link, nie  */}
          <DefaultButton onClick={() => router.push("/")}>
            Strona główna
          </DefaultButton>
        </div>
      </div>
    </section>
  );
}
