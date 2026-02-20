import WorkForm from "../WorkForm";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function NewWorkPage() {
  await createServerSupabaseClient();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Works 新規追加</h1>
      <WorkForm />
    </div>
  );
}
