import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@/lib/store";
import {PaymentType} from "@/lib/types/admin/payments";

type PaymentState = {
    payments: PaymentType[];
    isLoading: boolean;
    error: string | null;
}

const initialState: PaymentState = {
    payments: [],
    isLoading: false,
    error: null,
}

const paymentSlice = createSlice({
    name: "paymentSlice",
    initialState,
    reducers: {
        setPayments: (state, action: PayloadAction<PaymentType[]>) => {
            state.payments = action.payload;
            state.isLoading = false;
            state.error = null;
        },

        addPayment: (state, action: PayloadAction<PaymentType>) => {
            state.payments.push(action.payload);
            state.isLoading = false;
            state.error = null;
        },
    }
})

export const {addPayment, setPayments} = paymentSlice.actions;
export const selectPayment = (state: RootState) => state.payment.payments;
export const selectLoading = (state: RootState) => state.payment.isLoading;
export const selectError = (state: RootState) => state.payment.error;


export default paymentSlice.reducer;