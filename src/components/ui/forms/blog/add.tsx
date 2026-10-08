"use client";
import { authClient } from "@/lib/auth-client";
import { createBlog } from "@/lib/db/queries/insert";
import { categories } from "@/lib/db/schema";
import { UploadButton } from "@/utils/uploadthing";
import { useActionState, useState } from "react";

export function AddBlogForm() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const [state, formAction, pending] = useActionState(createBlog, undefined);
  const [image, setImage] = useState<{ url: string; key: string } | null>(null);
  const [uploadError, setUploadError] = useState("");

  if (sessionPending || !session)
    return (
      <div className="text-center">
        Tylko zalogowani użytkownicy mogą utworzyć artykuł
      </div>
    );

  const errors = state?.errors?.fieldErrors;

  return (
    <form action={formAction}>
      <input name="title" />
      {errors?.title && <p>{errors.title[0]}</p>}

      <textarea name="content" />
      {errors?.content && <p>{errors.content[0]}</p>}

      <select name="category">
        {categories.enumValues.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      {errors?.category && <p>{errors.category[0]}</p>}

      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={res => setImage(res[0].serverData)}
        onUploadError={error => setUploadError(error.message)}
      />
      {uploadError && <p>{uploadError}</p>}
      <input type="hidden" name="imageUrl" value={image?.url ?? ""} />
      <input type="hidden" name="imageKey" value={image?.key ?? ""} />
      {errors?.imageUrl && <p>{errors.imageUrl[0]}</p>}

      <button disabled={pending || !image}>Dodaj blog</button>
      {state?.message && <p>{state.message}</p>}
    </form>
  );
}
