// **** Payment *****
export type PaymentType = {
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
