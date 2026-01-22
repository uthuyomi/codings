"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/* =========
   Types
========= */

type LangBlock = {
  title: string;
  description: string;
};

type WorkFormData = {
  id?: string;
  slug: string;
  is_published: boolean;
  ja: LangBlock;
  en: LangBlock;
  pcimg: string;
  spimg: string;
  link: string;
  github: string; // ★ フォーム内部では string 固定
  skill: string[];
};

type Props = {
  initialData?: Partial<Omit<WorkFormData, "github">> & {
    github?: string | null; // ★ 受け取り側だけ null 許容
  };
};

/* =========
   Component
========= */

export default function WorkForm({ initialData }: Props) {
  const router = useRouter();
  const isEdit = Boolean(initialData?.id);

  const [form, setForm] = useState<WorkFormData>({
    slug: initialData?.slug ?? "",
    is_published: initialData?.is_published ?? false,

    ja: {
      title: initialData?.ja?.title ?? "",
      description: initialData?.ja?.description ?? "",
    },
    en: {
      title: initialData?.en?.title ?? "",
      description: initialData?.en?.description ?? "",
    },

    pcimg: initialData?.pcimg ?? "",
    spimg: initialData?.spimg ?? "",
    link: initialData?.link ?? "",
    github: initialData?.github ?? "", // ★ null → ""
    skill: initialData?.skill ?? [],
  });

  return (
    <form
      className="space-y-10 max-w-3xl"
      onSubmit={async (e) => {
        e.preventDefault();

        await fetch(isEdit ? `/api/works/${initialData!.id}` : "/api/works", {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            github: form.github || null, // ★ 送信時だけ null に戻す
          }),
        });

        router.push("/admin/works");
        router.refresh();
      }}
    >
      {/* ========= 基本 ========= */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">基本設定</h2>

        <input
          className="w-full rounded bg-slate-800 border border-slate-700 px-4 py-2"
          placeholder="スライドID（例: slide01）"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />

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
          value={form.ja.title}
          onChange={(e) =>
            setForm({ ...form, ja: { ...form.ja, title: e.target.value } })
          }
        />

        <textarea
          rows={4}
          className="w-full rounded bg-slate-800 border border-slate-700 px-4 py-2"
          placeholder="説明（JA）"
          value={form.ja.description}
          onChange={(e) =>
            setForm({
              ...form,
              ja: { ...form.ja, description: e.target.value },
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
          value={form.en.title}
          onChange={(e) =>
            setForm({ ...form, en: { ...form.en, title: e.target.value } })
          }
        />

        <textarea
          rows={4}
          className="w-full rounded bg-slate-800 border border-slate-700 px-4 py-2"
          placeholder="Description (EN)"
          value={form.en.description}
          onChange={(e) =>
            setForm({
              ...form,
              en: { ...form.en, description: e.target.value },
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
        className="rounded bg-teal-500 px-6 py-3 font-medium text-slate-900 hover:bg-teal-400 transition"
      >
        {isEdit ? "更新する" : "登録する"}
      </button>
    </form>
  );
}
