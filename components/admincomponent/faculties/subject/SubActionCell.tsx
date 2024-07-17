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
import {EditSubjectForm} from "@/components/admincomponent/faculties/subject/EditSubForm";
import {ViewSubjectForm} from "@/components/admincomponent/faculties/subject/VeiwSubForm";
import CardDisableComponent from "@/components/card/staff/CardDisableComponent";
import {
    useDisableFacultyByAliasMutation,
    useEnableFacultyByAliasMutation
} from "@/lib/features/admin/faculties/faculty/faculty";
import {
    useDisableSubjectByAliasMutation,
    useEnableSubjectByAliasMutation
} from "@/lib/features/admin/faculties/subject/subject";
import {TbCopy, TbEye, TbEyeCancel, TbFileImport, TbPencil} from "react-icons/tb";

const ActionsCell = ({row}: any) => {
    const [isCardVisible, setIsCardVisible] = useState(false);
    const [isDeleted, setIsDeleted] = useState(row.original.isDeleted);
    const [isEditFormVisible, setEditFormVisible] = useState(false);
    const [isViewFormVisible, setViewFormVisible] = useState(false);
    const subject = row.original;

    const handleOpenCard = () => {
        setIsCardVisible(true);
    };

    const [enableSubject, setEnableFaculty] = useEnableSubjectByAliasMutation();
    const [disableSubject, setDisableFaculty] = useDisableSubjectByAliasMutation();

    const handleConfirm = async (alias: string) => {
        if (isDeleted) {
            await enableSubject(alias).unwrap();
            setIsDeleted((prev: any) => !prev);
        } else {
            await disableSubject(alias).unwrap();
            setIsDeleted((prev: any) => !prev);
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

    const handleViewClick = () => {
        setViewFormVisible(true);
        setEditFormVisible(false); // Close edit form if open
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
                    {/*<DropdownMenuLabel>Actions</DropdownMenuLabel>*/}

                    <DropdownMenuItem
                        className="text-gray-30 focus:text-gray-30 focus:bg-background font-medium "
                        onClick={() => navigator.clipboard.writeText(subject.title)}
                    >
                        <TbCopy size={20} className="text-gray-30 mr-2  "/> Copy Subject Name
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="text-gray-30 focus:text-gray-30 focus:bg-background font-medium"
                        onClick={handleViewClick}
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

            {isEditFormVisible && <EditSubjectForm alias={`${subject.alias}`} onClose={handleCloseForm}/>}
            {isViewFormVisible && <ViewSubjectForm alias={`${subject.alias}`} onClose={handleCloseForm}/>}

            {isCardVisible && (
                <CardDisableComponent
                    message={isDeleted ? "Do you really want to enable this item?" : "Do you really want to disable this item?"}
                    onConfirm={() => handleConfirm(subject.alias)}
                    onCancel={handleCancel}
                    buttonTitle={isDeleted ? "Enable" : "Disable"}
                />
            )}
        </div>
    );
};

export default ActionsCell;
