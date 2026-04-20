import React, { useEffect, useState } from 'react'
import teachingImg from '../../Images/Teaching.svg'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import logo from '../../Images/Logo.jpg'

function TeacherDashboard() {
  const { ID } = useParams();
  const navigate = useNavigate();


  // ================= LOGOUT =================
  const Handlelogout = async () => {
    try {
      const response = await fetch(`/api/teacher/logout`, {
        method: 'POST',
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });

      const res = await response.json();

      if (res.statusCode === 200) navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  // ================= FETCH TEACHER =================
  const [teacher, setTeacher] = useState(null);

useEffect(() => {
  const fetchTeacher = async () => {
    try {
      const res = await fetch(`/api/teacher/teacherdocument/${ID}`, {
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to load teacher details");
      }

      setTeacher(data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchTeacher();
}, [ID]);
  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className='bg-[#04253A] px-10 py-3 flex justify-between items-center shadow-md'>
        <NavLink to="/">
          <div className='flex items-center gap-3'>
            <img src={logo} className="w-12" alt="logo" />
            <h1 className='text-2xl text-[#4E84C1] font-bold'>Digipatashala</h1>
          </div>
        </NavLink>

        <button
          onClick={Handlelogout}
          className='bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full text-sm font-medium transition'
        >
          Logout
        </button>
      </nav>

      {/* ================= HERO ================= */}
      <div className='relative bg-gradient-to-r from-[#008280] to-[#04253A] px-6 py-10 lg:pl-72'>
        <div className='mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between'>
          <div className='text-white'>
            <h2 className='text-3xl font-bold'>
              Welcome back, {teacher?.Firstname || "Teacher"}
            </h2>
            <p className='mt-2 opacity-75 text-sm'>
              Manage your classes, courses & quizzes
            </p>
            <div className='mt-4 flex flex-wrap gap-3 text-xs'>
              <span className='rounded-full bg-white/15 px-4 py-2'>
                {teacher?.Email || "Teacher email"}
              </span>
              <span className='rounded-full bg-white/15 px-4 py-2 capitalize'>
                {teacher?.Subject || "Subject not available"}
              </span>
              <span className='rounded-full bg-white/15 px-4 py-2 capitalize'>
                {teacher?.Isapproved || "pending"}
              </span>
            </div>
          </div>

          <img src={teachingImg} alt='teaching' className='w-full max-w-xs rounded-[2rem] shadow-2xl' />
        </div>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className='bg-[#071645] w-52 h-full absolute top-[4.5rem] flex flex-col items-center pt-8 shadow-xl'>

        <img
          src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
          alt="profile"
          className='w-14 h-14 rounded-full border-2 border-[#4E84C1] mb-3'
        />

        <p className='text-white text-sm font-medium mb-8 text-center px-2'>
          {teacher?.Firstname} {teacher?.Lastname}
        </p>

        <div className='flex flex-col w-full gap-1'>

          {/* DASHBOARD */}
          <NavLink
            to={`/Teacher/Dashboard/${ID}/Home`}
            className={({ isActive }) =>
              isActive
                ? 'bg-white text-[#4E84C1] py-3 px-6 font-semibold text-sm border-l-4 border-[#4E84C1]'
                : 'text-[#4E84C1] py-3 px-6 font-semibold text-sm hover:bg-[#0d2a5e]'
            }
          >
            Dashboard
          </NavLink>

          {/* CLASSES */}
          <NavLink
            to={`/Teacher/Dashboard/${ID}/Classes`}
            className={({ isActive }) =>
              isActive
                ? 'bg-white text-[#4E84C1] py-3 px-6 font-semibold text-sm border-l-4 border-[#4E84C1]'
                : 'text-[#4E84C1] py-3 px-6 font-semibold text-sm hover:bg-[#0d2a5e]'
            }
          >
            Classes
          </NavLink>

          {/* COURSES */}
          <NavLink
            to={`/Teacher/Dashboard/${ID}/Courses`}
            className={({ isActive }) =>
              isActive
                ? 'bg-white text-[#4E84C1] py-3 px-6 font-semibold text-sm border-l-4 border-[#4E84C1]'
                : 'text-[#4E84C1] py-3 px-6 font-semibold text-sm hover:bg-[#0d2a5e]'
            }
          >
            Courses
          </NavLink>

          {/* ✅ QUIZ (NEW) */}
          <NavLink
            to={`/Teacher/Dashboard/${ID}/Quiz`}
            className={({ isActive }) =>
              isActive
                ? 'bg-white text-[#4E84C1] py-3 px-6 font-semibold text-sm border-l-4 border-[#4E84C1]'
                : 'text-[#4E84C1] py-3 px-6 font-semibold text-sm hover:bg-[#0d2a5e]'
            }
          >
            Quiz
          </NavLink>

        </div>
      </div>
    </>
  );
}

export default TeacherDashboard;
