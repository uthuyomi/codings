// app/admin/works/[id]/page.tsx
import WorkForm from "../WorkForm";
import { WorkRecord } from "@/types/work";

export const dynamic = "force-dynamic";

async function getWork(id: string): Promise<WorkRecord> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/works/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch work: ${id}`);
  }

  return res.json();
}

export default async function EditWorkPage({
  params,
}: {
  // 🔴 ここが重要：Promise
  params: Promise<{ id: string }>;
}) {
  // 🔴 await が必須
  const { id } = await params;

  if (!id) {
    throw new Error("Work ID is undefined");
  }

  const work = await getWork(id);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Works 編集</h1>
      <WorkForm initialData={work} />
    </div>
  );
}
