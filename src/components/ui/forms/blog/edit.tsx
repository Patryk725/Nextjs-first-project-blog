"use client";
import { FieldErrors } from "@/components/ui/FieldErrors";
import { updateBlog } from "@/lib/db/queries/update";
import { categories, type Blog } from "@/lib/db/schema";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { useActionState, useState } from "react";
import DefaultButton from "../../Button/DefaultButton";

export function EditBlogForm({ blog }: { blog: Blog }) {
  const [state, formAction, pending] = useActionState(
    updateBlog.bind(null, blog.id),
    undefined,
  );
  const [image, setImage] = useState(
    blog.imageUrl && blog.imageKey
      ? { url: blog.imageUrl, key: blog.imageKey }
      : null,
  );
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const errors = state?.errors?.fieldErrors;

  return (
    <form
      action={formAction}
      className="bg-background-hover flex flex-col gap-4 rounded-md p-4"
    >
      <label htmlFor="title">Tytuł wpisu</label>
      <input id="title" name="title" defaultValue={blog.title} />
      <FieldErrors errors={errors?.title} />

      <label htmlFor="content">Treść wpisu</label>
      <textarea id="content" name="content" defaultValue={blog.content} />
      <FieldErrors errors={errors?.content} />

      <label htmlFor="category">Kategoria wpisu</label>
      <select id="category" name="category" defaultValue={blog.category}>
        {categories.enumValues.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <FieldErrors errors={errors?.category} />

      {image && (
        <Image
          src={image.url}
          alt=""
          width={160}
          height={100}
          className="rounded-sm object-cover"
        />
      )}
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
            return ready ? "Zmień zdjęcie" : "Ładowanie…";
          },
          allowedContent() {
            return "";
          },
        }}
      />
      {uploadError && <FieldErrors errors={[uploadError]} />}
      <FieldErrors errors={errors?.imageUrl} />
      <input type="hidden" name="imageUrl" value={image?.url ?? ""} />
      <input type="hidden" name="imageKey" value={image?.key ?? ""} />

      <DefaultButton type="submit" disabled={pending || uploading}>
        Zapisz zmiany
      </DefaultButton>
      <FieldErrors errors={state?.errors?.formErrors} />
      {state?.message && <p>{state.message}</p>}
    </form>
  );
}
