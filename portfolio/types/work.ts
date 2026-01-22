// types/work.ts

/**
 * DB（Supabase）に保存されているそのままの形
 * title / description は jsonb
 */
export type WorkRecord = {
  id: string;

  title: {
    ja: string;
    en: string;
  };

  description: {
    ja: string;
    en: string;
  };

  pcimg: string;
  spimg: string;

  link: string;
  github: string | null;

  skill: string[];
  is_published: boolean;

  created_at: string;
  updated_at: string;
};

/**
 * 表示用（lang 解決後）
 * API の GET /works?lang=ja などで返す形
 */
export type WorkView = {
  id: string;

  title: string;
  description: string;

  pcimg: string;
  spimg: string;

  link: string;
  github: string | null;

  skill: string[];
};
