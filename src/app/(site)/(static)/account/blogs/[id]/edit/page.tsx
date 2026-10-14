import { EditBlogForm } from "@/components/ui/forms/blog/edit";
import { verifySession } from "@/lib/dal";
import { getBlogById } from "@/lib/db/queries/select";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = await verifySession();
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog || blog.userId !== user.id) notFound();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Edytuj wpis</h2>
      <EditBlogForm blog={blog} />
    </div>
  );
}
