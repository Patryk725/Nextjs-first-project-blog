"use client";
import { FieldErrors } from "@/components/ui/FieldErrors";
import { authClient } from "@/lib/auth-client";
import { createBlog } from "@/lib/db/queries/insert";
import { categories } from "@/lib/db/schema";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { useActionState, useState } from "react";
import DefaultButton from "../../Button/DefaultButton";

export function AddBlogForm() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const [state, formAction, pending] = useActionState(createBlog, undefined);
  const [image, setImage] = useState<{ url: string; key: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  if (sessionPending || !session)
    return (
      <div className="text-center">
        Tylko zalogowani użytkownicy mogą utworzyć artykuł
      </div>
    );

  const errors = state?.errors?.fieldErrors;

  return (
    <form
      action={formAction}
      className="bg-background-hover flex flex-col gap-4 rounded-md p-4"
    >
      <label htmlFor="title">Tytuł wpisu</label>
      <input id="title" name="title" />
      <FieldErrors errors={errors?.title} />

      <label htmlFor="content">Treść wpisu</label>
      <textarea id="content" name="content" />
      <FieldErrors errors={errors?.content} />

      <label htmlFor="category">Kategoria wpisu</label>
      <select id="category" name="category">
        {categories.enumValues.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <FieldErrors errors={errors?.category} />

      <UploadButton
        endpoint="imageUploader"
        onUploadBegin={() => setUploading(true)}
        onClientUploadComplete={res => {
          setImage(res[0].serverData);
          setUploading(false);
        }}
        onUploadError={error => {
          setUploadError(error.message);
          setUploading(false);
        }}
        content={{
          button({ ready }) {
            return ready ? "Prześlij zdjęcie" : "Ładowanie…";
          },
          allowedContent() {
            return "";
          },
        }}
      />
      {uploadError && <FieldErrors errors={[uploadError]} />}
      <FieldErrors errors={errors?.imageUrl} />
      <FieldErrors errors={errors?.imageKey} />
      <input type="hidden" name="imageUrl" value={image?.url ?? ""} />
      <input type="hidden" name="imageKey" value={image?.key ?? ""} />
      {uploading && <p>Przesyłanie zdjęcia…</p>}
      {image && !uploading && <p>Zdjęcie przesłane</p>}
      {image && !uploading && (
        <Image src={image.url} alt="Podgląd" width={200} height={120} />
      )}
      <FieldErrors errors={state?.errors?.formErrors} />

      <DefaultButton type="submit" disabled={pending || uploading}>
        Dodaj wpis
      </DefaultButton>
      {state?.message && <p>{state.message}</p>}
    </form>
  );
}
