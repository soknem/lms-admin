import React, {useState} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";

import {EditStudyProForm} from "./EditStudyProgramForm";
import {useRouter} from "next/navigation";
import CardDisableComponent from "@/components/card/staff/CardDisableComponent";
import {
    useDisableStudyProgramByAliasMutation,
    useEnableStudyProgramByAliasMutation
} from "@/lib/features/admin/faculties/studyProgram/studyprogram";
import {TbCopy, TbEye, TbEyeCancel, TbFileImport, TbPencil} from "react-icons/tb";
import {LuSettings2} from "react-icons/lu";

const ActionsCell = ({row}: any) => {
    const [isCardVisible, setIsCardVisible] = useState(false);
    const [isDeleted, setIsDeleted] = useState(row.original.isDeleted);
    const [isEditFormVisible, setEditFormVisible] = useState(false);
    const [isViewFormVisible, setViewFormVisible] = useState(false);
    const study_program = row.original;
    const router = useRouter();


    const [enableStudyProgram, setEnableFaculty] = useEnableStudyProgramByAliasMutation();
    const [disableStudyProgram, setDisableFaculty] = useDisableStudyProgramByAliasMutation();

    const handleOpenCard = () => {
        setIsCardVisible(true);
    };


    const handleConfirm = async (alias: string) => {
        if (isDeleted) {
            await enableStudyProgram(alias).unwrap();
            setIsDeleted((prev: any) => !prev);
            console.log('Study Program enabled successfully');
        } else {
            await disableStudyProgram(alias).unwrap();
            setIsDeleted((prev: any) => !prev);
            console.log('Study Program disable successfully');
        }
        setIsCardVisible(false);
    };

    const handleCancel = () => {
        setIsCardVisible(false);
    };

    const handleEditClick = () => {
        setEditFormVisible(true);
        setViewFormVisible(false); // Close view form if open
    };

    const handleCloseForm = () => {
        setEditFormVisible(false);
        setViewFormVisible(false);
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        className="text-gray-30 focus:text-gray-30 focus:bg-background font-medium "
                        onClick={() => {
                            navigator.clipboard.writeText(study_program.studyProgramName);
                        }}
                    >
                        <TbCopy size={20} className="text-gray-30 mr-2  "/>
                        Copy Study Program
                    </DropdownMenuItem>
                    {/* <DropdownMenuSeparator className="bg-background px-2" /> */}
                    <DropdownMenuItem
                        className="text-gray-30 focus:text-gray-30 focus:bg-background font-medium"
                        onClick={() => {
                            router.push(`/admin/faculties/setup-studyprogram/${study_program.alias}`);
                        }}
                    >
                        <LuSettings2 size={20} className="text-gray-30 mr-2"/>
                        Set Up
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-gray-30 focus:text-gray-30 focus:bg-background font-medium"
                        onClick={() => {
                            router.push(`/admin/faculties/studyprogram-detail/${study_program.alias}`);
                        }}
                    >
                        <TbFileImport size={20} className="text-gray-30 mr-2"/>
                        View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-gray-30 focus:text-gray-30 focus:bg-background font-medium"
                        onClick={handleEditClick}
                    >
                        <TbPencil size={20} className="text-gray-30 mr-2"/>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className={` text-${isDeleted ? 'green-600' : 'red-600'} focus:text-${isDeleted ? 'green-600' : 'red-600'} font-medium focus:bg-background`}
                        onClick={handleOpenCard}
                    >
                        {isDeleted ? (
                            <>
                                <TbEye size={20} className="text-green-600 mr-2 "/> Enable
                            </>
                        ) : (
                            <>
                                <TbEyeCancel size={20} className="text-red-600 mr-2 "/> Disable
                            </>
                        )}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {isEditFormVisible && <EditStudyProForm alias={`${study_program.alias}`} onClose={handleCloseForm}/>}

            {isCardVisible && (
                <CardDisableComponent
                    message={isDeleted ? "Do you really want to enable this item?" : "Do you really want to disable this item?"}
                    onConfirm={() => handleConfirm(study_program.alias)}
                    onCancel={handleCancel}
                    buttonTitle={isDeleted ? "Enable" : "Disable"}
                />
            )}
        </div>
    );
};

export default ActionsCell;
