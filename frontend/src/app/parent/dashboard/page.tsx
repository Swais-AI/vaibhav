'use client';

import { useState, useEffect } from 'react';
import ChildSelector from '@/components/ChildSelector';
import LanguageSelector from '@/components/LanguageSelector';
import AssignmentCard from '@/components/AssignmentCard';
import QuizCard from '@/components/QuizCard';
import RemarksCard from '@/components/RemarksCard';
import NoticeBoard from '@/components/NoticeBoard';
import CommunicationBox from '@/components/CommunicationBox';
import { fetchDashboardData } from '@/lib/api';

export default function ParentDashboard() {
  const [studentId, setStudentId] = useState<number>(1);
  const [language, setLanguage] = useState<string>('en');
  
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      setData(null);
      
      try {
        const result = await fetchDashboardData(studentId);
        setData(result);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [studentId]);

  return (
    <div className="min-h-full flex flex-col bg-[#F9FAFB] text-gray-800 font-sans">
      
      {/* Top Bar */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <ChildSelector 
            currentStudentId={studentId} 
            onSelect={setStudentId} 
            disabled={isLoading}
          />
          <LanguageSelector 
            currentLang={language} 
            onSelect={setLanguage} 
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center gap-6 w-full md:w-auto justify-end">
          <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
            <span className="text-2xl">🔔</span>
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">2</span>
          </button>
          <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold overflow-hidden shadow-sm">
              <img src="https://i.pravatar.cc/150?img=47" alt="Profile" className="w-full h-full object-cover"/>
            </div>
            <div className="text-sm hidden sm:block">
              <p className="text-gray-500 text-xs">Welcome,</p>
              <p className="font-bold text-gray-800">Priya Sharma</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Content Section */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center shadow-sm border border-red-100">
              {error}
            </div>
          ) : data ? (
            <>
              {/* Welcome Banner */}
              <div className="bg-[#FFF8F3] p-6 md:p-8 rounded-2xl shadow-sm border border-orange-100 flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden shrink-0 bg-white">
                  <img src={`https://i.pravatar.cc/150?u=${data.student.student_id}`} alt="Student" className="w-full h-full object-cover"/>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Hello <span className="text-orange-600">Priya Sharma!</span>
                  </h2>
                  <p className="text-gray-600 mt-2 text-sm md:text-base">Here's an overview of {data.student.full_name}'s academic progress and school activities.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6 md:mt-0 w-full md:w-auto text-center md:text-left shrink-0">
                  <div className="bg-white/60 p-3 rounded-xl border border-orange-50/50">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-orange-600 mb-1">
                      <span className="text-lg">🏫</span>
                      <span className="text-xs font-semibold uppercase tracking-wide">Class</span>
                    </div>
                    <p className="font-bold text-gray-800 text-lg md:text-xl">{data.student.class}</p>
                  </div>
                  <div className="bg-white/60 p-3 rounded-xl border border-orange-50/50">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-orange-600 mb-1">
                      <span className="text-lg">📝</span>
                      <span className="text-xs font-semibold uppercase tracking-wide">Roll Number</span>
                    </div>
                    <p className="font-bold text-gray-800 text-lg md:text-xl">{data.student.roll_no}</p>
                  </div>
                  <div className="bg-white/60 p-3 rounded-xl border border-orange-50/50">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-orange-600 mb-1">
                      <span className="text-lg">📅</span>
                      <span className="text-xs font-semibold uppercase tracking-wide">Attendance</span>
                    </div>
                    <p className="font-bold text-gray-800 text-lg md:text-xl">92%</p>
                  </div>
                  <div className="bg-white/60 p-3 rounded-xl border border-orange-50/50">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-orange-600 mb-1">
                      <span className="text-lg">🎓</span>
                      <span className="text-xs font-semibold uppercase tracking-wide">Academic Year</span>
                    </div>
                    <p className="font-bold text-gray-800 text-lg md:text-xl">2025 - 26</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <AssignmentCard assignments={data.assignments} />
                <QuizCard quizzes={data.quiz} />
                <RemarksCard remarks={data.remarks} currentLang={language} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <NoticeBoard notices={data.notices} />
                <CommunicationBox studentId={studentId} />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
