import Image from 'next/image';

export default function CourseDetail ()  {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-full">
          Semester 1
        </span>
        <Image
          src="/logocourse.png"
          alt="Flutter Logo"
          width={50}
          height={50}
        />
      </div>
      <h2 className="text-2xl font-bold mb-2">FLUTTER MOBILE DEVELOPMENT</h2>
      <p className="text-gray-700 mb-4">
        Flutter course is designed to develop multi-platform like iOS and Android App, Web, Desktop
        apps like MacOS, Windows and Linux using one code base. We also include with UI / UX
        design concept.
      </p>
      <div className="flex items-center mb-4">
        <span className="mr-4 font-semibold">Credit: 3</span>
        <span className="mr-4">Theory: 2</span>
        <span>Practice: 1</span>
      </div>
      <div className="flex items-center mb-4">
        <Image
          className="w-10 h-10 rounded-full mr-4"
          src="/intructor.jpg"
          alt="Instructor"
          width={40}
          height={40}
        />
        <div>
          <p className="font-semibold">With</p>
          <p className="text-gray-600">IT Instructor</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex -space-x-2 overflow-hidden">
            <Image
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
              src="/student1.jpg"
              alt="Student 1"
              width={32}
              height={32}
            />
            <Image
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
              src="/student2.jpg"
              alt="Student 2"
              width={32}
              height={32}
            />
            <Image
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
              src="/student3.jpg"
              alt="Student 3"
              width={32}
              height={32}
            />
          </div>
          <span className="ml-3 text-gray-700">30 Students Joined</span>
        </div>
        <span className="text-gray-600">Class Start: Oct 26, 2024</span>
      </div>
    </div>
  );
};

