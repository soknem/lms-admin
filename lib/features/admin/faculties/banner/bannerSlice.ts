import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@/lib/store";
import {DegreeType} from "@/lib/types/admin/faculty";
import {BannerType} from "@/lib/types/admin/banner";

type BannerState = {
    banners: BannerType[];
    isLoading: boolean;
    error: string | null;
}

const initialState: BannerState = {
    banners: [],
    isLoading: false,
    error: null,
}

const bannerSlice = createSlice({
    name: "bannerSlice",
    initialState,
    reducers: {
        setBanners: (state, action: PayloadAction<BannerType[]>) => {
            state.banners = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        addBanner: (state, action: PayloadAction<BannerType>) => {
            state.banners.push(action.payload);
            state.isLoading = false;
            state.error = null;
        },
    }
})

export const {addBanner, setBanners} = bannerSlice.actions;
export const selectBanner = (state: RootState) => state.banner.banners;
export const selectLoading = (state: RootState) => state.banner.isLoading;
export const selectError = (state: RootState) => state.banner.error;


export default bannerSlice.reducer;