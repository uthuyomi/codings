// app/admin/works/[id]/page.tsx
import WorkForm from "../WorkForm";
import { WorkRecord } from "@/types/work";
import { headers } from "next/headers";

async function getWork(id: string): Promise<WorkRecord> {
  // ✅ headers() は await
  const headersList = await headers();
  const host = headersList.get("host");

  if (!host) {
    throw new Error("Host header is missing");
  }

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/works/${id}`, {
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
  params: { id: string };
}) {
  // ✅ params は Promise じゃない
  const { id } = params;

  const work = await getWork(id);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Works 編集</h1>
      <WorkForm initialData={work} />
    </div>
  );
}
