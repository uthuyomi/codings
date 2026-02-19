-- Seed data for public.works from the provided ja/en JSON.
-- Safe assumption: run once on an empty table.
-- If you want to re-run, uncomment the TRUNCATE (it deletes all rows).

begin;

-- truncate table public.works;

insert into public.works (
  title,
  description,
  pcimg,
  spimg,
  link,
  github,
  skill,
  is_published
)
values
(
  jsonb_build_object(
    'ja', 'LP Coding (Design → Implementation)',
    'en', 'LP Coding (Design → Implementation)'
  ),
  jsonb_build_object(
    'ja', 'Figmaデザインカンプをもとに、HTML/CSS/JavaScriptで実装したランディングページ。PC/SP両対応のレスポンシブ設計と、視線誘導を意識したレイアウトを重視。',
    'en', 'A landing page implemented with HTML/CSS/JavaScript based on a Figma design mockup. Emphasis on responsive design for PC and mobile, with layouts optimized for visual flow and user attention.'
  ),
  '/images/works/portfolio/inner-img01-pc.jpg',
  '/images/works/portfolio/inner-img01-sp.jpg',
  'https://webyayasu.sakura.ne.jp/portfolio/porenai-LP/porenai03/index.html',
  'https://github.com/uthuyomi/codings/tree/main/porenai-LP/porenai03',
  array['HTML','CSS','JavaScript','Responsive Design','Figma']::text[],
  true
),
(
  jsonb_build_object(
    'ja', 'LP Coding (Image-based Design)',
    'en', 'LP Coding (Image-based Design)'
  ),
  jsonb_build_object(
    'ja', '支給されたデザイン画像をもとに、HTML/CSS/JavaScriptでLPをコーディング。デザイン再現性と可読性を重視したマークアップを実装。',
    'en', 'Coded a landing page using HTML/CSS/JavaScript based on provided design images. Focused on accurate visual reproduction and readable, maintainable markup.'
  ),
  '/images/works/portfolio/inner-img02-pc.jpg',
  '/images/works/portfolio/inner-img02-sp.jpg',
  'https://webyayasu.sakura.ne.jp/bousai-LP/index.html',
  'https://github.com/uthuyomi/codings/tree/main/bousai-LP',
  array['HTML','CSS','JavaScript','Responsive Design']::text[],
  true
),
(
  jsonb_build_object(
    'ja', 'DocReview UI (Writing Review Web UI)',
    'en', 'DocReview UI (Writing Review Web UI)'
  ),
  jsonb_build_object(
    'ja', '業務メール/文章のレビューを「問題点・改善案・理由」で可視化する単一画面UI。ローディング/エラー/結果を状態分離し、結果はタブで切替。日英対応、Next.js Route Handler 経由で OpenAI Responses API を呼び出し、JSON Schemaで出力構造を制約。',
    'en', 'A single-screen UI that visualizes reviews of business emails and documents by separating issues, improvement suggestions, and reasons. Loading, error, and result states are handled independently, with results switchable via tabs. Supports both Japanese and English. Calls the OpenAI Responses API via Next.js Route Handlers, with output structure constrained using JSON Schema.'
  ),
  '/images/works/portfolio/docreview-pc.png',
  '/images/works/portfolio/docreview-sp.png',
  'https://docreview-ui.vercel.app/',
  'https://github.com/uthuyomi/docreview-ui',
  array[
    'Next.js (App Router)',
    'TypeScript',
    'Tailwind CSS',
    'UI State Management (Loading/Error/Result)',
    'Tab UI / Component Design',
    'i18n (JA/EN)',
    'Next.js Route Handler',
    'OpenAI Responses API',
    'JSON Schema',
    'Vercel'
  ]::text[],
  true
),
(
  jsonb_build_object(
    'ja', 'Touhou Talk (Character Chat UI Prototype)',
    'en', 'Touhou Talk (Character Chat UI Prototype)'
  ),
  jsonb_build_object(
    'ja', 'Next.js（App Router）と TypeScript で実装したキャラクター毎の会話履歴を保持するチャットUI。画面サイズに応じたレスポンシブ対応と、キャラクター切替時の状態管理にフォーカスしたフロントエンド設計。',
    'en', 'A chat UI implemented with Next.js (App Router) and TypeScript that preserves conversation history per character. Frontend architecture focuses on responsive behavior across screen sizes and state management when switching characters.'
  ),
  '/images/works/portfolio/touhou-talk-pc.png',
  '/images/works/portfolio/touhou-talk-sp.png',
  'https://touhou-talk.vercel.app/',
  'https://github.com/uthuyomi/touhou-talk',
  array[
    'Next.js (App Router)',
    'TypeScript',
    'Tailwind CSS',
    'Responsive UI Design',
    'State Management (Conversation/Character Switch)',
    'Frontend Architecture',
    'Vercel Deployment'
  ]::text[],
  true
);

commit;

