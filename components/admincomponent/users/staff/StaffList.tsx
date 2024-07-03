"use client";
import {Input} from "@/components/ui/input";
import {FaSearch} from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {FiPlus} from "react-icons/fi";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {InsData} from "@/app/admin/(admin-dashboard)/users/data/StaffData";
// @ts-ignore
import InstructorCardComponent from "./InstructorCardComponent";
import {useDispatch, useSelector} from "react-redux";
import {useGetStaffQuery} from "@/lib/features/admin/user-management/staff/staff";
import {setLecture} from "@/lib/features/admin/academic-management/lecture/lectureSlice";
import {selectStaff, setStaff} from "@/lib/features/admin/user-management/staff/staffSlice";
import {RootState} from "@/lib/store";
import {UserStaffDetailType} from "@/lib/types/admin/user";
import placeholderImage from "@/public/common/placeholderPf.png";

export default function StaffList() {

    // ===== get all staff =======
    const dispatch = useDispatch();

    const { data : staffList , error : staffError,isSuccess: isStaffSuccess ,isLoading: isStaffLoading} = useGetStaffQuery({ page: 0, pageSize: 10 })

    // console.log("staffData: ", staffList);

    let staffData: UserStaffDetailType[]  = [];
    if(isStaffSuccess){
        staffData = staffList.content;
        console.log("staff data from stafflist page: ", staffData)
    }

    const router = useRouter();
    // State for search query and selected position filters
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("");

    // Filtered card data based on search query and selected position
    // const filteredCardData : UserStaffDetailType[]  = staffData.filter(
    //     (st : UserStaffDetailType) =>
    //         st.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) &&
    //         (selectedPosition === "" ||
    //             st.position.toLowerCase() === selectedPosition.toLowerCase())
    // );
    const filteredCardData: UserStaffDetailType[] = staffData.filter(
        (st: UserStaffDetailType) =>
            (st.nameEn && st.nameEn.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (selectedPosition === "" ||
                (st.position && st.position.toLowerCase() === selectedPosition.toLowerCase()))
    );

    // Event handler for search input change
    const handleSearchChange = (event: any) => {
        setSearchQuery(event.target.value);
    };

    // Event handler for position filters change
    const handlePositionFilterChange = (position: string) => {
        setSelectedPosition(position);
    };


    return <>
        <div className="flex flex-row gap-x-4 mt-6">
            {/* Search */}
            <div className="flex items-center w-full relative">
                <Input
                    placeholder="Search by name...."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border-[#E6E6E6] bg-white pl-10 "
                />

                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400"/>
                </div>
            </div>

            {/*filters type of staff*/}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="border-[#E6E6E6] bg-white rounded-[10px] ml-auto hover:bg-gray-50 "
                    >
                        {selectedPosition || "All Staff Type"}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="border-[#E6E6E6] bg-white "
                >
                    <DropdownMenuItem onClick={() => handlePositionFilterChange("")}>
                        All Staff Type
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handlePositionFilterChange("instructor")}
                    >
                        Instructor
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handlePositionFilterChange("admin")}
                    >
                        Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handlePositionFilterChange("academic manager")}
                    >
                        Academic Manager
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/*filters type of staff*/}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="text-lms-white-80 bg-lms-primary hover:bg-lms-primary/90">
                        <FiPlus className="mr-2 h-4 w-4"/> Add
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="border-[#E6E6E6] bg-white "
                >
                    <DropdownMenuItem
                        onClick={() => router.push(`/admin/users/staff/add-instructor`)}
                    >
                        <Button className="flex justify-start bg-transparent w-full hover:bg-gray-50">
                            Instructor
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/admin/users/staff/add-staff`)}>
                        <Button className="flex justify-start bg-transparent w-full hover:bg-gray-50">
                            Staff
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-6">
            {isStaffLoading ? (
                <div className="mx-auto" >Loading...</div>
            ) : isStaffSuccess && filteredCardData.length > 0 ? (
                filteredCardData.map((card: UserStaffDetailType) => (
                    <InstructorCardComponent
                        key={card?.uuid || 'N/A'}
                        imageSrc={card?.profileImage || placeholderImage} // Use a default image if profileImage is empty or null
                        name={card.nameEn}
                        education={card.email}
                        position={card.position || "No position"}
                        linkedin={card.email}
                        github={card.email}
                        onClick={() => router.push(`/admin/users/staff/${card.uuid}`)}
                    />
                ))
            ) : (
                <div className="col-span-2 text-center text-gray-500">No match found for the selected position</div>
            )}

        </div>
    </>;
}
