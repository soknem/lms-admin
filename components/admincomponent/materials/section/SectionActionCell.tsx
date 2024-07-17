import React, {useState} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {MoreHorizontal} from 'lucide-react';
import {ViewDeForm} from '@/components/admincomponent/faculties/degree/ViewDeForm';
import {EditDeForm} from '@/components/admincomponent/faculties/degree/EditDeForm';
import CardDisableComponent from "@/components/card/staff/CardDisableComponent";
import {TbCopy, TbEye, TbEyeCancel, TbFileImport, TbPencil} from "react-icons/tb";
import {
    useDisableDegreeByAliasMutation,
    useEnableDegreeByAliasMutation
} from "@/lib/features/admin/faculties/degree/degree";
import {useSelector} from "react-redux";
import {selectDegree} from "@/lib/features/admin/faculties/degree/degreeSlice";
import {EditSectionForm} from "@/components/admincomponent/materials/section/EditSectionForm";
import {ViewSectionForm} from "@/components/admincomponent/materials/section/ViewSectionForm";

const ActionsCell = ({row}: any) => {
    const [isCardVisible, setIsCardVisible] = useState(false);
    const [isDeleted, setIsDeleted] = useState(row.original.isDeleted);
    const [isEditFormVisible, setEditFormVisible] = useState(false);
    const [isViewFormVisible, setViewFormVisible] = useState(false);
    const section = row.original;

    const handleOpenCard = () => {
        setIsCardVisible(true);
    };

    const [enableDegree, setEnableFaculty] = useEnableDegreeByAliasMutation();
    const [disableDegree, setDisableFaculty] = useDisableDegreeByAliasMutation();

    useSelector(selectDegree);

    const handleConfirm = async (alias: string) => {
        if (isDeleted) {
            await enableDegree(alias).unwrap();
            setIsDeleted((prev: any) => !prev);
        } else {
            await disableDegree(alias).unwrap();
            setIsDeleted((prev: any) => !prev);
        }
        setIsCardVisible(false);
    };

    const handleCancel = () => {
        setIsCardVisible(false);
    };

    const handleEditClick = () => {
        setEditFormVisible(true);
        setViewFormVisible(false);
    };
    const handleViewClick = () => {
        setViewFormVisible(true);
        setEditFormVisible(false);
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
                        onClick={() => navigator.clipboard.writeText(section.title)}
                    >
                        <TbCopy size={20} className="text-gray-30 mr-2  "/> Copy Section Title
                    </DropdownMenuItem>

                    {/*<DropdownMenuItem*/}
                    {/*    className="text-gray-30 focus:text-gray-30 focus:bg-background font-medium"*/}
                    {/*    onClick={handleViewClick}*/}
                    {/*>*/}
                    {/*    <TbFileImport size={20} className="text-gray-30 mr-2"/>*/}
                    {/*    View*/}
                    {/*</DropdownMenuItem>*/}

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
            {isViewFormVisible && <ViewSectionForm uuid={section.uuid} onClose={handleCloseForm}/>}
            {isEditFormVisible && <EditSectionForm uuid={section.uuid} onClose={handleCloseForm}/>}

            {isCardVisible && (
                <CardDisableComponent
                    message={isDeleted ? "Do you really want to enable this item?" : "Do you really want to disable this item?"}
                    onConfirm={() => handleConfirm(section.uuid)}
                    onCancel={handleCancel}
                    buttonTitle={isDeleted ? "Enable" : "Disable"}
                />
            )}
        </div>
    );
};

export default ActionsCell;