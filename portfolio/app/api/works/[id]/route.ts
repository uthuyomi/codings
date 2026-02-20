// app/api/works/[id]/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/admin/session";
import { createPublicSupabaseClient, createServiceSupabaseClient } from "@/lib/supabase/service";

/* =========================
   GET /api/works/:id
========================= */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "Work ID is missing" }, { status: 400 });
  }

  const isAdmin = Boolean(await getAdminSessionFromRequest(request));
  const supabase = isAdmin ? createServiceSupabaseClient() : createPublicSupabaseClient();

  let query = supabase
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
    .eq("id", id);
  if (!isAdmin) query = query.eq("is_published", true);
  const { data, error } = await query.single();

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
  const supabase = createServiceSupabaseClient();

  const session = await getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const supabase = createServiceSupabaseClient();

  const session = await getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase.from("works").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
