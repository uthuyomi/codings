"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ workId }: { workId: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("本当に削除しますか？")) return;

    const res = await fetch(`/api/works/${workId}`, { method: "DELETE" });
    if (!res.ok) {
      const payload = await res.json().catch(() => null);
      alert(String(payload?.error ?? `Delete failed (${res.status})`));
      return;
    }

    router.refresh();
  }

  return (
    <button onClick={handleDelete} className="text-red-400 hover:underline">
      削除
    </button>
  );
}
