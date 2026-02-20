import { unstable_noStore as noStore } from "next/cache";
import type { WorkView } from "@/types/work";
import WorksClient from "./WorksClient";
import { createPublicSupabaseClient } from "@/lib/supabase/service";

export const dynamic = "force-dynamic";

async function getWorks(lang: "ja" | "en"): Promise<WorkView[]> {
  noStore();

  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from("works")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).map((work) => ({
    id: work.id,
    title: work.title?.[lang] ?? "",
    description: work.description?.[lang] ?? "",
    pcimg: work.pcimg,
    spimg: work.spimg,
    link: work.link,
    github: work.github,
    skill: work.skill ?? [],
  }));
}

export default async function WorksPage() {
  const initialLang: "ja" = "ja";
  const initialWorks = await getWorks(initialLang);
  return <WorksClient initialLang={initialLang} initialWorks={initialWorks} />;
}
