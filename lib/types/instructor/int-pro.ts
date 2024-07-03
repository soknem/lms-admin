import {StaticImageData} from "next/image";

export type ProfileType = {
    // imageSrc: StaticImageData;
    imageSrc: StaticImageData;
    uuid: string;
    username: string;
    nameEn: string;
    nameKh: string;
    gender: string;
    email: string;
    phoneNumber: string;
    educations: string[];
    skills: string[];
    birthPlace: string;
    currentAddress: string;
    bio: string;
    dob: string;
    linkGit: string;
    linkLinkedin: string;
    linkTelegram: string;
    uploadCv: string;
    identityCard: string;
};
