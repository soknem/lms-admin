"use client";
import React, { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

import {useRouter} from "next/navigation";
import {TbEye, TbEyeCancel, TbFileImport, TbPencil,TbLockCog} from "react-icons/tb";
import CardDisableComponent from "@/components/card/staff/CardDisableComponent";
import {
    useDisableClassMutation,
    useEnableClassMutation
} from "@/lib/features/admin/academic-management/classes/classApi";
import {useDisableStaffMutation, useEnableStaffMutation} from "@/lib/features/admin/user-management/staff/staff";
import AddInstructorForm from "@/components/admincomponent/academics/classes/courses/form/addInstructor";
import EditUserAuthorityForm from "@/components/admincomponent/users/staff/EditUserAuthorityForm";

type props = {
    staffUuid : string
    isDeletedState : boolean
    position: string
}

const MoreInfo = ({staffUuid,isDeletedState,position } : props) => {
    const router = useRouter();


    const [isCardVisible, setIsCardVisible] = useState(false);
    const [isDeleted, setIsDeleted] = useState(isDeletedState);

    const [enableStaff] = useEnableStaffMutation();
    const [disableStaff] = useDisableStaffMutation();

    const handleOpenCard = () => {
        setIsCardVisible(true);
    };

    // *** Edit Authority form ****

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };


    const handleConfirm = async   (staffUuid : string) => {
        if(isDeleted){
            await enableStaff(staffUuid).unwrap();
            setIsDeleted((prev :any) => !prev);

        }else{
            await disableStaff(staffUuid).unwrap();
            setIsDeleted((prev : any) => !prev);
        }
        setIsCardVisible(false);
    };

    const handleCancel = () => {
        setIsCardVisible(false);
    };

    return (
        <div>
            {" "}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                        <span className='sr-only'>Open menu</span>
                        <MoreHorizontal className='h-4 w-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className="bg-white">

                    <DropdownMenuItem onClick={() => router.push(`edit-staff/${staffUuid}`)} className="text-gray-30 focus:text-gray-30 focus:bg-background font-medium">
                        <TbPencil size={20} className="text-gray-30 mr-2"  /> Edit
                    </DropdownMenuItem>

                    {
                        position !== "INSTRUCTOR" ? (
                            <DropdownMenuItem onClick={handleOpenModal} className="text-gray-30 focus:text-gray-30 focus:bg-background font-medium">
                                <TbLockCog size={20} className="text-gray-30 mr-2"  /> Edit Authorities
                            </DropdownMenuItem>
                        ) : (
                            <></>
                        )
                    }



                    <DropdownMenuItem
                        className={`text-${isDeleted ? 'green-600' : 'red-600'} focus:text-${isDeleted ? 'green-600' : 'red-600'} font-medium focus:bg-background`}
                        onClick={handleOpenCard}
                    >
                        {isDeleted ? (
                            <>
                                <TbEye size={20} className="text-green-600 mr-2" /> Enable
                            </>
                        ) : (
                            <>
                                <TbEyeCancel size={20} className="text-red-600 mr-2" /> Disable
                            </>
                        )}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {isCardVisible && (
                <CardDisableComponent
                    message={isDeleted ? "Do you really want to enable this user?" : "Do you really want to disable this user?"}
                    onConfirm={() => handleConfirm(staffUuid)}
                    onCancel={handleCancel}
                    buttonTitle={isDeleted ? "Enable" : "Disable"}
                />
            )}

            <EditUserAuthorityForm isVisible={isModalVisible} onClose={handleCloseModal} staffUuid={staffUuid} />
        </div>
    )

}

export default MoreInfo;
