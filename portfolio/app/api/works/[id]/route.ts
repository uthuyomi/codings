import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type Params = {
  params: {
    id: string;
  };
};

/* =====================================================
   GET /api/works/:id
   編集画面用：単一データ取得
===================================================== */
export async function GET(_request: Request, { params }: Params) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("works")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Work not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

/* =====================================================
   PUT /api/works/:id
   編集保存
===================================================== */
export async function PUT(request: Request, { params }: Params) {
  const supabase = await createServerSupabaseClient();
  const body = await request.json();

  const { error } = await supabase
    .from("works")
    .update({
      title: {
        ja: body.title_ja,
        en: body.title_en,
      },
      description: {
        ja: body.description_ja,
        en: body.description_en,
      },
      pcimg: body.pcimg,
      spimg: body.spimg,
      link: body.link,
      github: body.github || null,
      skill: body.skill,
      is_published: body.is_published,
      updated_at: new Date().toISOString(),
    })
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

/* =====================================================
   DELETE /api/works/:id
   削除
===================================================== */
export async function DELETE(_request: Request, { params }: Params) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.from("works").delete().eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
