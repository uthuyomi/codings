"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/* =========
   Types
========= */

type LangBlock = {
  ja: string;
  en: string;
};

type WorkFormData = {
  id?: string;
  title: LangBlock;
  description: LangBlock;
  pcimg: string;
  spimg: string;
  link: string;
  github: string; // フォーム内部では string 固定
  skill: string[];
  is_published: boolean;
};

type Props = {
  initialData?: {
    id?: string;
    title?: LangBlock;
    description?: LangBlock;
    pcimg?: string;
    spimg?: string;
    link?: string;
    github?: string | null;
    skill?: string[];
    is_published?: boolean;
  };
};

/* =========
   Component
========= */

export default function WorkForm({ initialData }: Props) {
  const router = useRouter();
  const isEdit = Boolean(initialData?.id);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<WorkFormData>({
    title: {
      ja: initialData?.title?.ja ?? "",
      en: initialData?.title?.en ?? "",
    },
    description: {
      ja: initialData?.description?.ja ?? "",
      en: initialData?.description?.en ?? "",
    },
    pcimg: initialData?.pcimg ?? "",
    spimg: initialData?.spimg ?? "",
    link: initialData?.link ?? "",
    github: initialData?.github ?? "", // null → ""
    skill: initialData?.skill ?? [],
    is_published: initialData?.is_published ?? false,
  });

  return (
    <form
      className="space-y-10 max-w-3xl"
      onSubmit={async (e) => {
        e.preventDefault();

        if (submitting) return;
        setSubmitting(true);
        try {
          const res = await fetch(isEdit ? `/api/works/${initialData!.id}` : "/api/works", {
            method: isEdit ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...form,
              github: form.github || null, // 送信時のみ null 許容
            }),
          });

          if (!res.ok) {
            const payload = await res.json().catch(() => null);
            const msg = String(payload?.error ?? `Request failed (${res.status})`);
            alert(msg);
            return;
          }

          router.push("/admin/works");
          router.refresh();
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {/* ========= 公開設定 ========= */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">公開設定</h2>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.is_published}
            onChange={(e) =>
              setForm({ ...form, is_published: e.target.checked })
            }
          />
          公開する
        </label>
      </section>

      {/* ========= 日本語 ========= */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">日本語</h2>

        <input
          className="w-full rounded bg-slate-800 border border-slate-700 px-4 py-2"
          placeholder="タイトル（JA）"
          value={form.title.ja}
          onChange={(e) =>
            setForm({
              ...form,
              title: { ...form.title, ja: e.target.value },
            })
          }
        />

        <textarea
          rows={4}
          className="w-full rounded bg-slate-800 border border-slate-700 px-4 py-2"
          placeholder="説明（JA）"
          value={form.description.ja}
          onChange={(e) =>
            setForm({
              ...form,
              description: { ...form.description, ja: e.target.value },
            })
          }
        />
      </section>

      {/* ========= English ========= */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">English</h2>

        <input
          className="w-full rounded bg-slate-800 border border-slate-700 px-4 py-2"
          placeholder="Title (EN)"
          value={form.title.en}
          onChange={(e) =>
            setForm({
              ...form,
              title: { ...form.title, en: e.target.value },
            })
          }
        />

        <textarea
          rows={4}
          className="w-full rounded bg-slate-800 border border-slate-700 px-4 py-2"
          placeholder="Description (EN)"
          value={form.description.en}
          onChange={(e) =>
            setForm({
              ...form,
              description: { ...form.description, en: e.target.value },
            })
          }
        />
      </section>

      {/* ========= メディア ========= */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">メディア</h2>

        <input
          className="w-full rounded bg-slate-800 border border-slate-700 px-4 py-2"
          placeholder="PC画像パス"
          value={form.pcimg}
          onChange={(e) => setForm({ ...form, pcimg: e.target.value })}
        />

        <input
          className="w-full rounded bg-slate-800 border border-slate-700 px-4 py-2"
          placeholder="SP画像パス"
          value={form.spimg}
          onChange={(e) => setForm({ ...form, spimg: e.target.value })}
        />
      </section>

      {/* ========= Links ========= */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">リンク</h2>

        <input
          className="w-full rounded bg-slate-800 border border-slate-700 px-4 py-2"
          placeholder="デモURL"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
        />

        <input
          className="w-full rounded bg-slate-800 border border-slate-700 px-4 py-2"
          placeholder="GitHub URL"
          value={form.github}
          onChange={(e) => setForm({ ...form, github: e.target.value })}
        />
      </section>

      {/* ========= Skills ========= */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Skills</h2>

        <input
          className="w-full rounded bg-slate-800 border border-slate-700 px-4 py-2"
          placeholder="スキル（Enterで追加）"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const value = (e.target as HTMLInputElement).value.trim();
              if (!value) return;

              setForm({
                ...form,
                skill: [...form.skill, value],
              });

              (e.target as HTMLInputElement).value = "";
            }
          }}
        />

        <ul className="flex flex-wrap gap-2">
          {form.skill.map((s, i) => (
            <li
              key={`${s}-${i}`}
              className="px-3 py-1 text-sm rounded-full bg-slate-700"
            >
              {s}
            </li>
          ))}
        </ul>
      </section>

      <button
        type="submit"
        disabled={submitting}
        className="rounded bg-teal-500 px-6 py-3 font-medium text-slate-900 hover:bg-teal-400 transition"
      >
        {submitting ? "送信中..." : isEdit ? "更新する" : "登録する"}
      </button>
    </form>
  );
}
