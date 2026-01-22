import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/* =====================================================
   GET /api/works
   公開用一覧取得（lang対応）
===================================================== */
export async function GET(request: Request) {
  const supabase = await createServerSupabaseClient();

  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") ?? "ja";

  const { data, error } = await supabase
    .from("works")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // lang に応じて view 用に整形（DB構造そのまま）
  const works = data.map((work) => ({
    id: work.id,
    title: work.title?.[lang] ?? "",
    description: work.description?.[lang] ?? "",
    pcimg: work.pcimg,
    spimg: work.spimg,
    link: work.link,
    github: work.github,
    skill: work.skill,
    is_published: work.is_published,
  }));

  return NextResponse.json(works);
}

/* =====================================================
   POST /api/works
   新規作成（DB構造準拠）
===================================================== */
export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();
  const body = await request.json();

  const { error } = await supabase.from("works").insert({
    title: {
      ja: body.title?.ja ?? "",
      en: body.title?.en ?? "",
    },
    description: {
      ja: body.description?.ja ?? "",
      en: body.description?.en ?? "",
    },
    pcimg: body.pcimg,
    spimg: body.spimg,
    link: body.link,
    github: body.github ?? null,
    skill: body.skill,
    is_published: body.is_published,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
