import { Stringifier } from "postcss";

// **** Generation *****
export type GenerationType = {
  generation: string;
  startYear: string;
  endYear: string;
  status: string;
  alias: string;
};

export type OptionType = {
  label: string;
  value: string;
};

// **** Class *****
export type ClassType = {
  alias: string;
  className: string;
  description: string;
  studyProgramAlias: string;
  shiftAlias: string;
  generationAlias: string;
  isDelete: boolean;
  isDraft: boolean;
  studentAliases: string[];
};


