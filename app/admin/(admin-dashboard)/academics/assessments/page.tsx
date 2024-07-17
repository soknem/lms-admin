'use client'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

// transcript import
import {TranscriptType} from "@/lib/types/admin/academics";
import transcripts from "@/app/admin/(admin-dashboard)/academics/assessments/data/transcripts.json"

//each semester import
import {semesterAssessementType} from "@/lib/types/admin/academics";
import semesterAssessments from "@/app/admin/(admin-dashboard)/academics/assessments/data/semesterAssessments.json"

//each course import
import {courseAssessmentType , courseAssessmentTableType} from "@/lib/types/admin/academics";
import courseAssesment from "@/app/admin/(admin-dashboard)/academics/assessments/data/courseAssesment.json"
import React, {useEffect, useState} from "react";
import {TranscriptDataTable} from "@/components/admincomponent/academics/assesments/transcript/data-table";
import {TranscriptColumns} from "@/components/admincomponent/academics/assesments/transcript/columns";
import {CourseAssesmentDataTable} from "@/components/admincomponent/academics/assesments/eachCourse/data-table";
import {CourseAssessmentColumns} from "@/components/admincomponent/academics/assesments/eachCourse/columns";
import {SemesterDataTable} from "@/components/admincomponent/academics/assesments/eachSemester/data-table";
import {
    eachSemesterColumn,
}
    from "@/components/admincomponent/academics/assesments/eachSemester/columns";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {
    useGetAssessmentQuery, useGetSemestersMutation,
    useGetTranscriptsMutation
} from "@/lib/features/admin/academic-management/assesment/assessment";

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {TbFilter} from "react-icons/tb";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {useGetGenerationQuery} from "@/lib/features/admin/academic-management/generation/generation";
import {useGetCoursesQuery} from "@/lib/features/admin/academic-management/courses/courseApi";
import {useGetStudyProgramsQuery} from "@/lib/features/admin/faculties/studyProgram/studyprogram";
import FilterStudyProgramPopover from "@/components/common/filter/FilterStudyProgramPopover";
import FilterGenerationPopover from "@/components/common/filter/FilterGenerationPopover";
import FilterSemesterPopover from "@/components/common/filter/FilterSemesterPopover";
import FilterYearPopover from "@/components/common/filter/FilterYearPopover";
import {FiPlus} from "react-icons/fi";
import {
    selectEachSemesterAssessment,
    setEachSemesterAssessment
} from "@/lib/features/admin/academic-management/assesment/assessmentEachSemesterSlice";
import FilterClassPopover from "@/components/common/filter/FilterClassPopover";
import FilterCoursePopover from "@/components/common/filter/FilterCoursePopover";

type TranscriptFilterType = {
    generationAlias: string;
    year: number;
    studyProgramAlias: string;
}

export default function Assessment() {



    // const semesterData: semesterAssessementType[] = semesterAssessments;


    // const fetchData = async () => {
    //     try {
    //         const result = await getTranscripts({
    //             studyProgramAlias: 'software-engineering-bachelor',
    //             generationAlias: 'generation-1',
    //             year: 1,
    //             semester: 1,
    //         });
    //
    //         console.log('Fetched data:', result);
    //     } catch (err) {
    //         console.error('Failed to fetch transcripts', err);
    //     }
    // };

    // ==== Transcript ====


    // const [getTranscripts, { data, error, isLoading }] = useGetTranscriptsMutation();
    // const [transcriptData, setTranscriptData] = useState([]); // Initialize state for transcript data
    // const [filters, setFilters] = useState({
    //     generationAlias: '',
    //     year: '',
    //     semester: '',
    //     studyProgramAlias: '',
    // });
    //
    // const fetchTranscriptData = async (filters : any) => {
    //     try {
    //         const result = await getTranscripts({
    //             studyProgramAlias: 'software-engineering-bachelor',
    //             generationAlias: filters.generationAlias,
    //             year: 1,
    //             semester: 1,
    //         }).unwrap();
    //
    //         setTranscriptData(result);
    //     } catch (err) {
    //         console.error('Failed to fetch transcripts', err);
    //     }
    // };
    //
    // useEffect(() => {
    //     fetchTranscriptData(filters);
    // }, [filters]);
    //
    // const handleFilterChange = (newFilters : any) => {
    //     setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    // };

    const [getTranscripts, { data: transcriptData, error: transcriptError, isLoading: isTranscriptLoading }] = useGetTranscriptsMutation();

    const [transcripts , setTranscripts] = useState<TranscriptType[]>([])

    const fetchTranscriptData = async (filters: TranscriptFilterType) => {
        try {
            const result = await getTranscripts({
                studyProgramAlias: selectedProgram.alias,
                generationAlias: selectedGeneration.alias,
                year: selectedYear.alias,
            }).unwrap();

            console.log('Fetched data:', result);
            setTranscripts(result.content)

            // Handle the fetched data as needed
        } catch (err) {
            console.error('Failed to fetch transcripts', err);
        }
    };

    const [filters, setFilters] = useState({
        generationAlias: '',
        year: 1,
        studyProgramAlias: '',
    });

    useEffect(() => {
        // Fetch initial data when component mounts
        fetchTranscriptData(filters);
    }, []); // Empty dependency array to run once on mount

    const handleTranscriptFilter = () => {
        fetchTranscriptData(filters); // Call fetch function on filter button click
    };

    const handleFilterChange = (newFilters: any) => {
        setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    };



    // === semester ===
    const [getSemesters, { data: semesterData, error: semesterError, isLoading: isSemesterLoading }] = useGetSemestersMutation();

    const [semesters , setSemesters] = useState([])

    const dispatch = useDispatch();

    const fetchSemesterData = async (filters: any) => {
        try {
            const result = await getSemesters({
                studyProgramAlias: selectedProgram.alias,
                generationAlias: selectedGeneration.alias,
                year: selectedYear.alias,
                semester: selectedSemester.alias
            }).unwrap();

            console.log('Fetched data:', result);
            setSemesters(result.content)
            dispatch(setEachSemesterAssessment(result.content));

        } catch (err) {
            console.error('Failed to fetch semester', err);
        }
    };

    const [semesterfilters, setSemesterFilters] = useState({
        generationAlias: '',
        year: 1,
        studyProgramAlias: '',
        semester: 1
    });



    useEffect(() => {
        // Fetch initial data when component mounts
        fetchSemesterData(semesterfilters);

    }, []); // Empty dependency array to run once on mount

    const handleSemesterFilter = () => {
        fetchSemesterData(semesterfilters); // Call fetch function on filter button click

    };

    console.log("semester filters", semesters);



    // console.log("data semester from store: ",semesterStoreData)


    // ==== fetch generation ====
    const [openGeneration, setOpenGeneration] = useState(false);
    const [selectedGeneration, setSelectedGeneration] = useState({ alias: '', label: '' });


    const handleGenChange = (selectedOption : any) => {
        setSelectedGeneration(selectedOption);
        console.log("Selected generation alias:", selectedOption.alias);
    };

    const handleReset = () => {
        setSelectedGeneration({ alias: '', label: '' });
    };

    // === Study Program ===
    const [openPrograms, setOpenPrograms] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState({alias: '', label: ''});

    const handleProgramChange = (program : any) => {
        setSelectedProgram(program);
    };

    const handleProgramReset = () => {
        setSelectedProgram({alias: '', label: ''});
    };

    console.log("Study Program Selected: ",selectedProgram)


    // === semester ===
    const [openSemester, setOpenSemester] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState({ alias: 1, label: '' });

    const handleSemesterChange = (semester : any) => {
        setSelectedSemester(semester);
    };

    console.log("semester:", selectedSemester);

    const handleSemesterReset = () => {
        setSelectedSemester({ alias: 1, label: '' });
    };

    // === year ===
    const [openYear, setOpenYear] = useState(false);
    const [selectedYear, setSelectedYear] = useState({ alias: 1, label: '' });

    const handleYearChange = (year : any) => {
        setSelectedYear(year);
    };

    const handleYearReset = () => {
        setSelectedYear({ alias: 1, label: '' });
    };


    // === class ===
    const [openClasses, setOpenClasses] = useState(false);
    const [selectedClasses, setSelectedClasses] = useState({ alias: '', label: '' });

    const handleClassesChange = (year : any) => {
        setSelectedClasses(year);
    };

    const handleClassesReset = () => {
        setSelectedClasses({ alias: '', label: '' });
        setSelectedCourse({ alias: '', label: '' });
        setQueryParams((prevParams) => ({
            ...prevParams,
            classUuid: '',
            courseUuid: ''
        }));
    };

    // === course ===
    const [openCourse, setOpenCourse] = useState(false);
    const [selectedCourse,setSelectedCourse] = useState({ alias: '', label: '' });

    const handleCourseChange = (year : any) => {
        setSelectedCourse(year);
    };

    const handleCourseReset = () => {
        setSelectedCourse({ alias: '', label: '' });
    };

    // === Fetch Each Course data ====
    const [queryParams, setQueryParams] = useState({ page: 0, pageSize: 10, courseUuid: '', classUuid: '' });

    const { data: courseData, error: courseError, isSuccess: isCourseSuccess, isLoading: isCourseLoading } = useGetAssessmentQuery(queryParams);

    const handleCourseFilter = () => {
        setQueryParams({
            page: 0,
            pageSize: 10,
            courseUuid: selectedCourse.alias,
            classUuid: selectedClasses.alias,
        });
    };

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (isCourseSuccess) {
            setCourses(courseData.content);
        }
        if (courseError) {
            console.error("Failed to load course", courseError);
        }
    }, [courseData, courseError]);

    const transformCourseData = (data : any) => {
        return data.map((item : any) => ({
            uuid: item.uuid,
            cardId: item.student.cardId,
            nameEn: item.student.nameEn,
            gender: item.student.gender,
            dob: item.student.dob,
            class: item.classCode,
            course: item.course.title,
            midtermExamScore: item.midtermExamScore,
            finalExamScore: item.finalExamScore,
            attendanceScore: item.attendanceScore,
            assignmentScore: item.assignmentScore,
            miniProjectScore: item.miniProjectScore,
            activityScore: item.activityScore,
            grade: item.grade,
            total: item.total,
            status: item.student.studentStatus
        }));
    };


    return (
        <main className="flex flex-col gap-4 h-full w-full p-9">
            <h2 className="text-3xl text-lms-primary font-bold">Assesments</h2>
            <Tabs defaultValue="transcript" className="w-full">

                <TabsList className="grid w-[400px] grid-cols-3">
                    <TabsTrigger value="transcript">Transcript</TabsTrigger>
                    <TabsTrigger value="semester">Each Semester</TabsTrigger>
                    <TabsTrigger value="course">Each Courses</TabsTrigger>
                </TabsList>

                <TabsContent value="transcript">
                    {/* Filter */}
                    <div className="flex items-center space-x-2">
                        <FilterGenerationPopover
                            open={openGeneration}
                            setOpen={setOpenGeneration}
                            selectedGeneration={selectedGeneration}
                            handleGenChange={handleGenChange}
                            handleReset={handleReset}
                        />

                        <FilterStudyProgramPopover
                            open={openPrograms}
                            setOpen={setOpenPrograms}
                            selectedProgram={selectedProgram}
                            handleProgramChange={handleProgramChange}
                            handleReset={handleProgramReset}
                        />



                        <FilterYearPopover
                            open={openYear}
                            setOpen={setOpenYear}
                            selectedYear={selectedYear}
                            handleYearChange={handleYearChange}
                            handleReset={handleYearReset}
                        />

                        <Button onClick={handleTranscriptFilter} className=' text-lms-white-80 bg-lms-primary hover:bg-lms-primary/90'>
                             Filter
                        </Button>

                    </div>


                    <TranscriptDataTable columns={TranscriptColumns} data={transcripts}/>
                </TabsContent>

                <TabsContent value="semester">
                    {/* Filter */}
                    <div className="flex items-center space-x-2">
                        <FilterGenerationPopover
                            open={openGeneration}
                            setOpen={setOpenGeneration}
                            selectedGeneration={selectedGeneration}
                            handleGenChange={handleGenChange}
                            handleReset={handleReset}
                        />

                        <FilterStudyProgramPopover
                            open={openPrograms}
                            setOpen={setOpenPrograms}
                            selectedProgram={selectedProgram}
                            handleProgramChange={handleProgramChange}
                            handleReset={handleProgramReset}
                        />


                        <FilterYearPopover
                            open={openYear}
                            setOpen={setOpenYear}
                            selectedYear={selectedYear}
                            handleYearChange={handleYearChange}
                            handleReset={handleYearReset}
                        />

                        <FilterSemesterPopover
                            open={openSemester}
                            setOpen={setOpenSemester}
                            selectedSemester={selectedSemester}
                            handleSemesterChange={handleSemesterChange}
                            handleReset={handleSemesterReset}
                        />

                        <Button onClick={handleSemesterFilter}
                                className=' text-lms-white-80 bg-lms-primary hover:bg-lms-primary/90'>
                            Filter
                        </Button>

                    </div>

                    <SemesterDataTable columns={eachSemesterColumn} data={semesters}/>
                </TabsContent>

                <TabsContent value="course">
                    {/* Filter */}
                    <div className="flex items-center space-x-2">
                        <FilterClassPopover
                            open={openClasses}
                            setOpen={setOpenClasses}
                            selectedClass={selectedClasses}
                            handleClassChange={handleClassesChange}
                            handleReset={handleClassesReset}
                        />

                        <FilterCoursePopover
                            open={openCourse}
                            setOpen={setOpenCourse}
                            selectedCourse={selectedCourse}
                            handleCourseChange={handleCourseChange}
                            handleReset={handleCourseReset}
                            classUuid={selectedClasses.alias}
                        />

                        <Button onClick={handleCourseFilter} className=' text-lms-white-80 bg-lms-primary hover:bg-lms-primary/90'>
                            Filter
                        </Button>

                    </div>

                    <CourseAssesmentDataTable columns={CourseAssessmentColumns} data={transformCourseData(courses)}/>
                    {/*{*/}
                    {/*    isCourseSuccess ? (*/}
                    {/*        */}
                    {/*    ): (*/}
                    {/*        <></>*/}
                    {/*    )*/}
                    {/*}*/}

                </TabsContent>
            </Tabs>
        </main>
    );
}

