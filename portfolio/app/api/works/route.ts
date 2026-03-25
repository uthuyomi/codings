import { NextResponse, type NextRequest } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/admin/session";
import { createPublicSupabaseClient, createServiceSupabaseClient } from "@/lib/supabase/service";

export const dynamic = "force-dynamic";

/* =====================================================
   GET /api/works
   公開用一覧取得（lang対応）
===================================================== */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") ?? "ja";
  const includeUnpublished = searchParams.get("includeUnpublished") === "1";

  const supabase = includeUnpublished ? createServiceSupabaseClient() : createPublicSupabaseClient();

  if (includeUnpublished) {
    const session = await getAdminSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let query = supabase.from("works").select("*").order("sort_order", { ascending: true });
  if (!includeUnpublished) query = query.eq("is_published", true);
  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // lang に応じて view 用に整形（DB構造そのまま）
  const works = data.map((work) => ({
    id: work.id,
    kind: work.kind ?? "web",
    title: work.title?.[lang] ?? "",
    description: work.description?.[lang] ?? "",
    pcimg: work.pcimg,
    spimg: work.spimg ?? null,
    link: work.link,
    github: work.github,
    skill: work.skill,
  }));

  return NextResponse.json(works, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

/* =====================================================
   POST /api/works
   新規作成（DB構造準拠）
===================================================== */
export async function POST(request: NextRequest) {
  const supabase = createServiceSupabaseClient();
  const body = await request.json();

  const session = await getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const kind = (body.kind ?? "web") as string;
  if (!body?.pcimg) {
    return NextResponse.json({ error: "pcimg is required" }, { status: 400 });
  }
  if (kind === "web" && !body?.spimg) {
    return NextResponse.json(
      { error: "spimg is required for kind=web" },
      { status: 400 },
    );
  }
  if (!body?.link) {
    return NextResponse.json({ error: "link is required" }, { status: 400 });
  }

  const { error } = await supabase.from("works").insert({
    kind,
    title: {
      ja: body.title?.ja ?? "",
      en: body.title?.en ?? "",
    },
    description: {
      ja: body.description?.ja ?? "",
      en: body.description?.en ?? "",
    },
    pcimg: body.pcimg,
    spimg: body.spimg ?? null,
    link: body.link,
    github: body.github ?? null,
    skill: body.skill,
    is_published: body.is_published,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
}
