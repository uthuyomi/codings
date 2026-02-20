// app/admin/works/page.tsx
import Link from "next/link";
import { WorkView } from "@/types/work";
import DeleteButton from "./DeleteButton";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getWorks(): Promise<WorkView[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("works")
    .select("id,title,description,pcimg,spimg,link,github,skill")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch works: ${error.message}`);
  }

  const lang: "ja" = "ja";
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

export default async function AdminWorksPage() {
  const works = await getWorks();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-100">Works 管理</h1>
          <p className="text-sm text-slate-400 mt-1">
            登録済みの制作実績を管理します
          </p>
        </div>

        <Link
          href="/admin/works/new"
          className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-medium text-slate-900 hover:bg-teal-400 transition"
        >
          ＋ 新規追加
        </Link>
      </div>

      {/* List */}
      <ul className="space-y-4">
        {works.map((work: WorkView) => (
          <li
            key={work.id}
            className="group rounded-xl border border-slate-700 bg-slate-900/60 p-5 flex items-center justify-between hover:border-teal-400/50 transition"
          >
            {/* Left */}
            <div className="flex flex-col">
              <span className="text-base font-medium text-slate-100">
                {work.title}
              </span>
              <span className="text-xs text-slate-400 mt-1">ID: {work.id}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/works/${work.id}`}
                className="text-sm text-teal-400 hover:text-teal-300 transition"
              >
                編集
              </Link>

              <DeleteButton workId={work.id} />
            </div>
          </li>
        ))}
      </ul>

      {/* Empty */}
      {works.length === 0 && (
        <div className="mt-16 text-center text-slate-400">
          登録されている Works はありません
        </div>
      )}
    </div>
  );
}
