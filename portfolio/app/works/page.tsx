import { unstable_noStore as noStore } from "next/cache";
import type { WorkView } from "@/types/work";
import Slide from "@/components/works/Slide";
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
    .order("sort_order", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

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

export default async function WorksPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: "ja" | "en" }>;
}) {
  const params = await searchParams;

  const lang: "ja" | "en" = params.lang === "en" ? "en" : "ja";

  const works = await getWorks(lang);

  return (
    <>
      {/* Client側：操作だけ */}
      <WorksClient currentLang={lang} />

      {/* Server側：描画（ここが重要） */}
      <main className="relative z-20 pt-30 pl-5 pr-5">
        <div className="py-12 flex flex-col items-center -mt-20">
          {works.map((item) => (
            <Slide key={item.id} data={item} />
          ))}
        </div>
      </main>
    </>
  );
}
