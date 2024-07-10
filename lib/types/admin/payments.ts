// **** Payment *****
export type PaymentType = {
    totalAmount: number | null;
    pwRate: number | null;
    pwHours: number;
    theoryRate: number | null;
    theoryHours: number;
    lectureEndTime: string;
    lectureStartTime: string;
    date: string;
    receipt_id: number;
    student: {
        name: string;
        studentProfile: string;
    };
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

};

export type StatusOption = {
    label: string;
    value: boolean;
};
