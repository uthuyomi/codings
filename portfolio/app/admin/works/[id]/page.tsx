// app/admin/works/[id]/page.tsx
import WorkForm from "../WorkForm";
import { createServiceSupabaseClient } from "@/lib/supabase/service";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditWorkPage({
  params,
}: {
  // 🔴 ここが重要：Promise
  params: Promise<{ id: string }>;
}) {
  // 🔴 await が必須
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const supabase = createServiceSupabaseClient();

  const { data, error } = await supabase
    .from("works")
    .select("id,kind,title,description,pcimg,spimg,link,github,skill,is_published")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Works 編集</h1>
      <WorkForm initialData={data} />
    </div>
  );
}
