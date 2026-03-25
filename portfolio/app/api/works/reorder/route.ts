import { NextResponse, type NextRequest } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/service";

export async function PUT(req: NextRequest) {
  const supabase = createServiceSupabaseClient();
  const body = await req.json();

  try {
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const updates = body.map((item: { id: string }, index: number) => ({
      id: item.id,
      sort_order: index,
    }));

    for (const u of updates) {
      const { error } = await supabase
        .from("works")
        .update({ sort_order: u.sort_order })
        .eq("id", u.id);

      if (error) {
        console.error("Update failed:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to reorder" }, { status: 500 });
  }
}
