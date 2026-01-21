"use client";
import React, { useState } from "react";

// =============================
// 🔹 型定義
// =============================
type ContactForm = {
  name: string;
  furigana: string;
  email: string;
  message: string;
  submit: string;
};

type ContactData = {
  title: string;
  form: ContactForm;
};

type ContactProps = {
  data: ContactData;
};

// =============================
// 🔹 コンポーネント本体
// =============================
const Contact = ({ data }: ContactProps) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const sendData = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      });

      const result = await res.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Error:", err);
      setStatus("error");
    }
  };

  const f = data.form;

  return (
    <section
      id="contact"
      className="py-12 flex flex-col items-center pl-10 pr-10"
    >
      <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-wide border-b border-gray-600 pb-2 mb-10">
        {data.title}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-md mt-8 space-y-4"
      >
        <div className="w-full">
          <label className="block text-white text-sm mb-1">{f.name}</label>
          <input
            type="text"
            name="name"
            required
            className="w-full text-black bg-gray-300 rounded px-3 py-2 outline-none"
          />
        </div>

        <div className="w-full">
          <label className="block text-white text-sm mb-1">{f.furigana}</label>
          <input
            type="text"
            name="furigana"
            className="w-full text-black bg-gray-300 rounded px-3 py-2 outline-none"
          />
        </div>

        <div className="w-full">
          <label className="block text-white text-sm mb-1">{f.email}</label>
          <input
            type="email"
            name="email"
            required
            className="w-full text-black bg-gray-300 rounded px-3 py-2 outline-none"
          />
        </div>

        <div className="w-full">
          <label className="block text-white text-sm mb-1">{f.message}</label>
          <textarea
            name="message"
            rows={5}
            required
            className="w-full text-black bg-gray-300 rounded px-3 py-2 outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-gray-300 text-black px-6 py-1 rounded mt-2 hover:bg-gray-400 transition disabled:opacity-50"
        >
          {status === "loading" ? "送信中..." : f.submit}
        </button>

        {status === "success" && (
          <p className="text-green-400 text-sm mt-2">✅ 送信が完了しました。</p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm mt-2">❌ 送信に失敗しました。</p>
        )}
      </form>
    </section>
  );
};

export default Contact;
