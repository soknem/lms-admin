// **** Payment *****
export type PaymentType = {
  receipt_id: number;
  student: {
    name: string;
    profile_image: string;
  };
  gender: string;
  date: string;
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
  id: number;
};

export type StatusOption = {
  label: string;
  value: string;
};
