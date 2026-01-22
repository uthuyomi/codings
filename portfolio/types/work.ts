// types/work.ts

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
  github?: string | null;

  skill: string[];
  is_published: boolean;
};

export type WorkView = {
  id: string;
  title: string;
  description: string;
  pcimg: string;
  spimg: string;
  link: string;
  github?: string | null;
  skill: string[];
};
