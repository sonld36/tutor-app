import React from "react";
import CourseCard from "../components/CourseCard";
import AppointmentCard from "../components/AppointmentCard";
import { useGetListCourseEnrollQuery } from "../services/courseApi";
import { useGetAppointmentsQuery } from "../services/userApi";

function UserProfile() {
  const { data: courses } = useGetListCourseEnrollQuery({
    page: 1,
    size: 10,
  });

  const { data: appointments } = useGetAppointmentsQuery({
    page: 1,
    size: 10,
  });

  console.log(appointments);

  return (
    <>
      <>
        <div className="bg-gray-100">
          <div className="container mx-auto py-8">
            <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
              <div className="col-span-4 sm:col-span-3">
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex flex-col items-center">
                    <img
                      src="https://randomuser.me/api/portraits/men/94.jpg"
                      className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                    ></img>
                    <h1 className="text-xl font-bold">John Doe</h1>
                    <p className="text-gray-700">Software Developer</p>
                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                      <a
                        href="#"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                      >
                        Contact
                      </a>
                      <a
                        href="#"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                      >
                        Resume
                      </a>
                    </div>
                  </div>
                  <hr className="my-6 border-t border-gray-300" />
                  <div className="flex flex-col">
                    <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                      Skills
                    </span>
                    <ul>
                      <li className="mb-2">JavaScript</li>
                      <li className="mb-2">React</li>
                      <li className="mb-2">Node.js</li>
                      <li className="mb-2">HTML/CSS</li>
                      <li className="mb-2">Tailwind Css</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-span-6 sm:col-span-8 space-y-5">
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-xl font-bold">Course</h2>
                  {courses?.courses.courses.map((course) => (
                    <CourseCard
                      course={course}
                      onClick={() => console.log("click")}
                    />
                  ))}
                </div>
                <div className="bg-white shadow rounded-lg p-6 space-y-3">
                  <h2 className="text-xl font-bold">Appointment</h2>
                  {appointments?.appointment.availabilities.map(
                    (appointment) => (
                      <AppointmentCard
                        avatarPath={appointment.tutor.avatar_path}
                        tutorName={
                          appointment.tutor.first_name +
                          " " +
                          appointment.tutor.last_name
                        }
                        subject={appointment.tutor.subject}
                        timeStart={appointment.time.hour_of_day.toString()}
                        date={
                          appointment.time.day_of_month +
                          "/" +
                          appointment.time._month +
                          "/" +
                          appointment.time._year
                        }
                        timeEnd={(appointment.time.hour_of_day + 1).toString()}
                        tutorId={appointment.tutor.user_id}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default UserProfile;
