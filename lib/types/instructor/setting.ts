import * as Yup from "yup";

export type InstructorSettingRequest = {
    profileImage: string;
    gender: string;
    phoneNumber: string;
    bio: string;
    linkTelegram: string;
    linkGit: string;
    linkLinkedin: string;
    currentAddress: string;
    birthPlace: string;
};


const validationSchema = Yup.object().shape({
    gender: Yup.string().required("Gender is required"),
    phoneNumber: Yup.string().required("Personal Number is required").matches(/^[\d\s]+$/, "Personal Number must be a number"),
    currentAddress: Yup.string().required("Current Address is required"),
    birthPlace: Yup.string().required("Place of Birth is required"),
    linkGit: Yup.string().url("Invalid URL").required("Git link is required"),
    linkLinkedin: Yup.string().url("Invalid URL").required("Linkedin link is required"),
    linkTelegram: Yup.string().url("Invalid URL").required("Telegram link is required"),
});