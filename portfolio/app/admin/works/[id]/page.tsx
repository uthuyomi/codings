import WorkForm from "../WorkForm";
import { WorkRecord } from "@/types/work";

async function getWork(id: string): Promise<WorkRecord> {
  const res = await fetch(`/api/works/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch work");
  }

  return res.json();
}

export default async function EditWorkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ★ ここが重要
  const { id } = await params;

  const work = await getWork(id);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Works 編集</h1>
      <WorkForm initialData={work} />
    </div>
  );
}
