// **** Curriculum *****
export type MaterialType = {
    uuid: string,
    title: string;
    description: string;
    contentType: string;
    extension: string;
    size: number;
    fileName: string,
    subjectAlias: null,
    isDraft: false
    fileType: string,
    fileUrl: string,
    subject: string;
    isDeleted: boolean,
    download: string,
    sectionUuid: string,
};

export type StatusOption = {
    label: string;
    value: number;
};
