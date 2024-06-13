import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { FaCirclePlay } from "react-icons/fa6";


  const sections = [
    {
      title: 'Basic and fundamental Programming concepts',
      videos: [
        { title: 'Enum and Structs', duration: '30:35' },
        { title: 'Arrays', duration: '30:35' },
        { title: 'Strings', duration: '30:35' },
      ],
    },
    { title: 'Compound Data Type', videos: [] },
    { title: 'Function', videos: [] },
    { title: 'OOP (Object-Oriented Programming)', videos: [] },
    { title: 'Asynchronous in Floutter', videos: [] },
    { title: 'Local Storage', videos: [] },
    { title: 'Details On Widget', videos: [] },
    { title: 'Stateless and Stateful', videos: [] },
  ];
  
  export default function VideoComponent() {
    return (
      <div className="items-center  p-[35px] bg-lms-white-80 rounded-lg my-10">
      <h1 className="text-[36px] font-bold mb-4">Course Video</h1>
      <p className="text-lms-gray-80 text-[18px] mb-6">
        All video provides an overview of the detailed course. Learn about our mission, values, and what sets us apart.
      </p>
      <Accordion type="single" collapsible className="w-full">
        {sections.map((section, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="py-[20px] px-4 hover:bg-lms-background  hover:text-lms-primary rounded-md mb-2 font-semibold text-[20px] no-underline hover:no-underline">
              {section.title}
            </AccordionTrigger>
            <AccordionContent className="ml-4 mb-4">
              {section.videos.length > 0 ? (
                 <ul>
                 {section.videos.map((video, vidIndex) => (
                   <li key={vidIndex} className="flex justify-between items-center py-2 px-4 hover:bg-lms-background hover:text-lms-primary text-[18px] rounded-md ">
                     <div className="flex items-center space-x-[20px]">
                       <FaCirclePlay className="text-lms-primary w-[26px] h-[26px]" />
                       <span className="text-prima">{video.title}</span>
                     </div>
                     <span className="text-lms-gray-80">{video.duration}</span>
                   </li>
                 ))}
               </ul>
              ) : (
                <p className="text-lms-gray-80">No videos available</p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}