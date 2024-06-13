// **** Payment *****
export type PaymentType = {
    receipt_id: number;
    name: string;
    profile_image: string;
    gender: string;
    date: number;
    discount: number;
    total_payment: number;
    balance_due: number;
    academic_fee: number;
    payment_method: string;
    status: string;
    remark: string;
    generation: string;
    year: string;
    academic: string;
    degree: string;
    faculty: string;
    major: string;
    class: string;
    shift: string;
    id: string;
};

export type StatusOption = {
    label: string;
    value: string;
};
