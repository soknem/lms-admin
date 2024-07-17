// **** Curriculum *****
export type MaterialType = {
    uuid: string,
    title: string;
    contentType: string;
    fileType: string,
    extension: string;
    description: string;
    size: number;
    fileName: string,
    fileUrl: string,
    subject: string;
    isDraft: boolean
    isDeleted: boolean,
    download: string,
    sectionUuid: string,
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

export type SectionType = {
    uuid: string;
    title: string;
    subjectAlias: string;
    materials: string;
    isDeleted: boolean;
    isDraft: boolean;
}

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
