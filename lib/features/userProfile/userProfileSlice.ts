import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {RootState} from "@/lib/store";



type UserProfileType = {
    profileImage: string;
    nameEn: string;
    position: string;
};


type UserProfileState = {
    userProfile: UserProfileType;
};


const initialState: UserProfileState = {
    userProfile: {
        profileImage: "",
        nameEn: "",
        position: ""
    },
};


const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers: {
        setUserProfile(state, action: PayloadAction<UserProfileType>) {
            state.userProfile = action.payload;
        },
    },
});


export const { setUserProfile } = userProfileSlice.actions;
export const selectProfile= (state: RootState) => state.userProfile.userProfile?.profileImage;
export const selectUsername= (state: RootState) => state.userProfile.userProfile?.nameEn;
export const selectPosition= (state: RootState) => state.userProfile.userProfile?.position;

export default userProfileSlice.reducer;
