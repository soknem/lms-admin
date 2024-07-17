// UserProfileFetcher.tsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetProfileQuery } from '@/lib/features/userProfile/userProfile';
import { setUserProfile } from '@/lib/features/userProfile/userProfileSlice';
import {any} from "prop-types";

interface UserProfileFetcherProps {
    children: React.ReactNode; // Optionally pass children to render after fetching profile
}

const UserProfileFetcher = ({ children }: UserProfileFetcherProps) => {
    const dispatch = useDispatch();

    const { data: userProfile, error: userError, isLoading } = useGetProfileQuery(any);

    useEffect(() => {
        if (userProfile) {
            dispatch(setUserProfile(userProfile));
        }
    }, [dispatch, userProfile]);


    return (
        <>
            {children} {/* Render children if provided */}
        </>
    );
};

export default UserProfileFetcher;
