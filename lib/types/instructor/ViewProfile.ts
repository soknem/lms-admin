export type InstructorViewProfile = {
    uuid: string;
    nameEn: string | null;
    nameKh: string | null;
    gender: string | null;
    email: string | null;
    position: string | null;
    profileImage : string | null;
    phoneNumber: string | null;
    isDeleted: boolean;
    educations: string[] | null;
    skills: string[] | null;
    birthPlace?: string | null;
    currentAddress?: string | null;
    bio?: string | null;
    dob?: string | null;
    linkGit : string | null;
    linkLinkedin: string | null;
    linkTelegram: string | null;
    uploadCv: string | null;
    identityCard: string | null;
};




export type CardInstructorProps = {
    id: string;
    profileImage: String;
    name: string;
    education: string[];
    position: string;
    linkedin: string;
    github: string;
    mail: string;
    skills: string[];
    currentAddress: string;
    linkTelegram: string;
    phoneNumber: string;
    bio: string;
};