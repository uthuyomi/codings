//api/works/[id]/route.ts
import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/* =========================
   Params (Next.js 15 対応)
========================= */
type Params = Promise<{
  id: string;
}>;

/* =========================
   GET /api/works/:id
========================= */
export async function GET(_request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("works")
    .select(
      `
      id,
      title,
      description,
      pcimg,
      spimg,
      link,
      github,
      skill,
      is_published
    `,
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Work not found", detail: error?.message },
      { status: 404 },
    );
  }

  return NextResponse.json(data);
}

/* =========================
   PUT /api/works/:id
========================= */
export async function PUT(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const body = await request.json();

  const { error } = await supabase
    .from("works")
    .update({
      title: body.title,
      description: body.description,
      pcimg: body.pcimg,
      spimg: body.spimg,
      link: body.link,
      github: body.github ?? null,
      skill: body.skill,
      is_published: body.is_published,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

/* =========================
   DELETE /api/works/:id
========================= */
export async function DELETE(
  _request: Request,
  { params }: { params: Params },
) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.from("works").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
