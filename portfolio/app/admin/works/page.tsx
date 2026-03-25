import AdminWorksClient from "./AdminWorksClient";
import { createServiceSupabaseClient } from "@/lib/supabase/service";
import { WorkView } from "@/types/work";

export const dynamic = "force-dynamic";

/* =========================
   DB取得
========================= */
async function getWorks(): Promise<WorkView[]> {
  const supabase = createServiceSupabaseClient();

  const { data, error } = await supabase
    .from("works")
    .select("id,kind,title,description,pcimg,spimg,link,github,skill")
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch works: ${error.message}`);
  }

  const lang: "ja" = "ja";

  return (data ?? []).map((work) => ({
    id: work.id,
    kind: work.kind ?? "web",
    title: work.title?.[lang] ?? "",
    description: work.description?.[lang] ?? "",
    pcimg: work.pcimg,
    spimg: work.spimg ?? null,
    link: work.link,
    github: work.github,
    skill: work.skill ?? [],
  }));
}

/* =========================
   Page
========================= */
export default async function AdminWorksPage() {
  const works = await getWorks();

  return <AdminWorksClient initialWorks={works} />;
}
