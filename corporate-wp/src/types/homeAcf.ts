export type HeroProps = {
  acf: {
    hero_heading: string;
    hero_text: string;
    hero_link: string;
    hero_link_label: string;
  };
};

export type ProfileProps = {
  acf: {
    profile_heading01: string;
    profile_img: string;
    profile_heading02: string;
    profile_text: string;
  };
};

export type ServiceProps = {
  acf: {
    service_heading: string;
  };
};

export type SkillProps = {
  acf: {
    skill_heading: string;
  };
};

export type ContactProps = {
  acf: {
    contact_heading: string;
  };
};

//ここから下はhomeページ内アイテム群

export type ProfileSnsProps = {
  id: number;
  acf: {
    sns_img_thumbnail: string;
    sns_linkurl: string;
  };
};

export type ServiceContent = {
  id: string;
  acf: {
    service_item_thumbnail: string;
    service_item_title: string;
    service_item_text: string;
  };
};

export type SkillContent = {
  id: string;
  acf: {
    skill_item_thumbnail: String;
    skill_item_level_img: string;
    skill_item_text: string;
    skill_item_level_text: string;
  };
};
