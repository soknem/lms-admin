// CourseSearchFilter.tsx
import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import {FaSearch} from "react-icons/fa";
import {TbFilter} from "react-icons/tb";
import {DropdownMenu, DropdownMenuItem} from "@/components/ui/dropdown-menu";

type CourseSearchFilterProps = {
    onSearch: (query: string) => void;
    onFilter: (semester: string) => void;
};

const CourseSearchFilter: React.FC<CourseSearchFilterProps> = ({onSearch, onFilter}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    };

    const handleFilterChange = (semester: string) => {
        setSelectedSemester(semester);
        onFilter(semester);
    };

    return (
        <div className="flex items-start py-4 w-full gap-4">
            <div className="flex items-center w-full justify-between gap-4">
                <div className="flex items-center w-full relative">
                    <Input
                        placeholder="Search Course"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="border-[#E6E6E6] bg-white rounded-[10px] pl-10 text-lms-gray-30 w-full"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400"/>
                    </div>
                </div>
            </div>

            {/* Dropdown Menu for semester filter */}
            <DropdownMenu>

                <button
                    className="flex items-center justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60 px-3 py-2 rounded-md">
                    <TbFilter className="mr-2 h-4 w-4"/>
                    Filter By Semester
                </button>
                <DropdownMenuItem
                    onClick={() => handleFilterChange("semester1")}
                >
                    Semester 1
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleFilterChange("semester2")}
                >
                    Semester 2
                </DropdownMenuItem>
            </DropdownMenu>
        </div>
    );
};

export default CourseSearchFilter;
