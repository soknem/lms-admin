
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import {PaymentType} from "@/lib/types/instructor/timesheet";


type PaymentState = {
    payments: PaymentType[];
    loading: boolean;
    error: string | null;
};

const initialState: PaymentState = {
    payments: [],
    loading: false,
    error: null,
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setPayments: (state, action: PayloadAction<PaymentType[]>) => {
            state.payments = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { setPayments, setLoading, setError } = paymentSlice.actions;

export const selectPayments = (state: RootState) => state.payment.payments;
export const selectLoading = (state: RootState) => state.payment.isLoading;
export const selectError = (state: RootState) => state.payment.error;

export default paymentSlice.reducer;
