// **** Curriculum *****
export type MaterialType = {
    alias: string;
    title: string;
    description: string;
    contentType: string;
    extension: string;
    size: number;
    // file: string;
    fileName: string,
    subjectAlias: null,
    // "isDeleted": false,
    isDraft: false
};

// **** Slide *****

export type SlideType = {
    title: string;
    course: string;
    description: string;
    type: string;
    status: number;
    subject: string;
    file: string;
};

export type CurriculumType = {
    title: string;
    course: string;
    description: string;
    type: string;
    status: number;
    subject: string;
    file: string;
};
// **** Video *****
export type VideoType = {
    title: string;
    course: string;
    description: string;
    type: string;
    status: number;
    subject: string;
    file: string;
};

export type StatusOption = {
    label: string;
    value: number;
};
