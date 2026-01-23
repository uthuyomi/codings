// app/api/works/[id]/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/* =========================
   GET /api/works/:id
========================= */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "Work ID is missing" }, { status: 400 });
  }

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
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const body = await request.json();
  const supabase = await createServerSupabaseClient();

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
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.from("works").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
