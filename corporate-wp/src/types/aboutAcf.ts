export type AboutProps = {
  acf: {
    about_img: string;
    about_heading: string;
    about_text: string;
  }
}

export type SKillProps = {
  acf: {
    about_skill_heading: string;
  }
}

export type AboutSkill = {
  id: number;
  acf: {
    about_skillset_heading: string;
    about_skillset_text: string;
  };
};
