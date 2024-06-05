import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MdFileCopy } from "react-icons/md";

const sections = [
  {
    title: "Basic and fundamental Programming concepts",
    videos: [
      { title: "Enum and Structs", duration: "30:35" },
      { title: "Arrays", duration: "30:35" },
      { title: "Strings", duration: "30:35" },
    ],
  },
  { title: "Compound Data Type", videos: [] },
  { title: "Function", videos: [] },
  { title: "OOP (Object-Oriented Programming)", videos: [] },
  { title: "Asynchronous in Floutter", videos: [] },
  { title: "Local Storage", videos: [] },
  { title: "Details On Widget", videos: [] },
  { title: "Stateless and Stateful", videos: [] },
];

export default function SlideComponent() {
  return (
    <div className="h-auto items-center  p-[35px] bg-white rounded-lg my-10">
      {/* Course title */}

      <h1 className="text-[36px] font-bold mb-4">Course Slide</h1>
      {/* Course description */}

      <p className="text-gray-80 text-[18px] mb-6">
        All Slide provides an overview of the detailed course. Learn about our
        mission, values, and what sets us apart.
      </p>

      <Accordion type="single" collapsible className="w-full">
        {sections.map((section, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="py-[20px] px-4 hover:bg-gray-100  hover:text-primary rounded-md mb-2 font-semibold text-[20px] no-underline hover:no-underline">
              {section.title}
            </AccordionTrigger>
            <AccordionContent className="ml-4 mb-4">
              {section.videos.length > 0 ? (
                <ul>
                  {/* Mapping over the videos to display them */}

                  {section.videos.map((video, vidIndex) => (
                    <li
                      key={vidIndex}
                      className="flex justify-between items-center py-2 px-4 hover:bg-gray-100 hover:text-primary text-[18px] rounded-md "
                    >
                      <div className="flex items-center space-x-[20px]">
                        {/* Displaying the icon and video title */}

                        <MdFileCopy className="text-primary w-[26px] h-[26px]" />
                        <span className="text-prima">{video.title}</span>
                      </div>
                      {/* Displaying the video duration */}

                      <span className="text-gray-500">{video.duration}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No slide available</p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
