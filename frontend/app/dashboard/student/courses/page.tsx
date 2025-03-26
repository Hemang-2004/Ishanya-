"use client";

import { useEffect, useState } from "react";

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem("userID");
      if (storedId) {
        setStudentId(storedId);
      }
    }
  }, []);

  useEffect(() => {
    if (!studentId) return;

    fetch(`http://localhost:5000/students/${studentId}/program`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        setCourses(Array.isArray(data) ? data : [data]); // Ensure data is an array
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, [studentId]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">My Programs</h2>
        <p className="text-muted-foreground">View and manage your enrolled courses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.ProgramID} className="border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-medium mb-2">{course.ProgramName}</h3>
              <p className="text-muted-foreground mb-4">{course.ProgramDescription}</p>
              <div className="flex justify-between items-center">
                <button className="text-primary text-sm font-medium">Continue</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">No courses found.</p>
        )}
      </div>
    </div>
  );
}