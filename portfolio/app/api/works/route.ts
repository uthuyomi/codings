import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

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

  // lang に応じて view 用に整形
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

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient(); // ★ await
  const body = await request.json();

  const { error } = await supabase.from("works").insert({
    title: { ja: body.title_ja, en: body.title_en },
    description: { ja: body.description_ja, en: body.description_en },
    pcimg: body.pcimg,
    spimg: body.spimg,
    link: body.link,
    github: body.github || null,
    skill: body.skill,
    is_published: body.is_published,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
