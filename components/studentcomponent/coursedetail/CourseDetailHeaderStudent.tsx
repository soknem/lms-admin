import React from "react";
import { useRouter } from "next/navigation";
import type { CourseDetail } from "@/lib/types/student/course";
import Image from "next/image";

export default function     CourseDetailHeaderStudent({
                                                      year,
                                                      semester,
                                                      courseTitle,
                                                      courseDescription,
                                                      courseLogo,
                                                      credit,
                                                      theory,
                                                      practice,
                                                      instructor,
                                                      internship,
                                                      position,
                                                      studentProfileImage,
                                                      classesStart
                                                  }: CourseDetail) {
    const router = useRouter();

    return (
        <section>
            <section className="mx-[90px] flex flex-col-2 justify-between">
                <div className="h-[250px]">
          <span className="px-[25px] mx-2 py-1 text-sm font-semibold text-white bg-lms-secondary rounded-full mb-10">
            Year {year || "N/A"}
          </span>
                    <span
                        className="px-[25px] py-1 text-sm font-semibold text-white bg-lms-secondary rounded-full mb-10">
            Semester {semester || "N/A"}
          </span>
                    <h2 className="text-[40px] font-bold text-lms-black90 mt-[14px]">
                        {courseTitle?.toUpperCase() || "Course Title"}
                    </h2>
                    <p className="text-lms-gray-80 w-[803px] text-[18px] mt-[14px]">
                        {courseDescription || "Course Description"}
                    </p>
                    <div className="flex items-center mt-[25px]">
                        <span className="mr-4 font-semibold">
                            Credit: {credit || "N/A"}
                        </span>
                        <span className="mr-4 font-semibold">
                            | Theory: {theory || "N/A"}
                        </span>
                        <span className="mr-4 font-semibold">
                            | Practice: {practice || "N/A"}
                        </span>
                        <span className="mr-4 font-semibold">
                            | Internship: {internship || "N/A"}
                        </span>
                    </div>
                </div>
                <div
                    className="mt-[30px] w-[500px] flex justify-center "
                    // style={{backgroundImage: `url(${courseLogo})`}}
                >
                    <Image
                        src={courseLogo || 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png'}
                        alt="Course Logo"
                        width={300}
                        height={0}
                        className="h-auto"
                    />
                </div>
            </section>
            <section className="flex items-center mx-[90px] mt-12 ">
                <img
                    onClick={() =>
                        router.push(`/instructor/view-profile/${instructor?.uuid}`)
                    }
                    className="w-[60px] h-[60px] rounded-full mr-4 cursor-pointer"
                    src={
                        instructor?.instructorProfileImage ||
                        "https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg"
                    }
                    alt="Instructor"
                    width={60}
                    height={60}
                />
                <div>
                    <p className="font-bold text-[20px] text-lms-primary">
                        {instructor?.nameEn || "Unknown Instructor"}
                    </p>
                    <p className="text-lms-gray-80 text-[18px]">
                        {position || 'Unknown Position'}
                    </p>
                </div>
                <div className="flex items-center ml-[88px] ">
                    <div className="flex -space-x-7 items-center cursor-pointer">
                        {studentProfileImage?.length > 0 ? (
                            studentProfileImage.map((src: string, index: number) => (
                                <Image
                                    key={index}
                                    src={
                                        src ||
                                        "https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg"
                                    }

                                    alt={`Student ${index + 1}`}
                                    width={40}
                                    height={40}
                                    className=" h-[40px] hover:scale-[100%] rounded-full object-cover ring-2 ring-white"
                                />
                            ))
                        ) : (
                            <span>No students joined</span>
                        )}
                    </div>
                    <div className="flex items-center ml-2">
                        <div className="mr-2 font-bold">
                            <div className="text-lms-primary ml-10">
                                {studentProfileImage?.length || 0}
                            </div>
                            <div className="text-lms-gray-80">Students Joined</div>
                        </div>
                    </div>
                    <div className="mx-[100px] mt-5">
                        <span className="text-lms-gray-80 font-bold">Class Start:</span>
                        <span className="ml-2 font-bold">
              {classesStart
                  ? new Date(classesStart).toLocaleDateString()
                  : "Unknown"}
            </span>
                    </div>
                </div>
            </section>


        </section>

    );
}
