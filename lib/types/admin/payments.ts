// **** Payment *****
export type PaymentType = {
    receiptId: string;
    uuid: string,
    usernameOrEmail: string;
    gender: string;
    discount: number;
    paidAmount: number;
    balanceDue: number;
    courseFee: number;
    paymentMethod: string;
    status: boolean;
    remark: string;
    paidDate: string;
    originalPayment: number;
    totalPayment: number;
    studentName: string,
    studentProfile: string,
    paidReturn: number,
    academicFee: number,
    generation: string,
    degree: string,
    faculty: string,
    academicYear: string,
    studyProgram: string;
    year: number,
    "semester": number,
    classCode: string,
    shift: string,
};

export type StatusOption = {
    label: string;
    value: boolean;
};
