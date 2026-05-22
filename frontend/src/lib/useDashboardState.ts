import { useState, useEffect } from 'react';

/**
 * Persistent dashboard state backed by localStorage.
 *
 * studentId and parentId default to 0 (meaning "not yet loaded / not set").
 * Pages should guard API calls with `if (!studentId) return;` to avoid
 * firing requests with an invalid ID before localStorage is read or before
 * ChildSelector has auto-selected the first real child.
 *
 * Bootstrap flow for RDS testing:
 *   1. GET /debug/seeded-parents  → note the real parent_id
 *   2. In browser DevTools console:
 *        localStorage.setItem('sgs_parent_id', '<parent_id>')
 *   3. Refresh — ChildSelector reads the real parentId, fetches children,
 *      and auto-selects the first child (setting studentId automatically).
 */
export function useDashboardState() {
  const [studentId, setStudentId] = useState<number>(0); // 0 = not set yet
  const [parentId,  setParentId]  = useState<number>(0); // 0 = not set yet
  const [language,  setLanguage]  = useState<string>('en');

  // Read persisted values from localStorage once on mount (client-side only).
  useEffect(() => {
    const savedStudent = localStorage.getItem('sgs_student_id');
    const savedParent  = localStorage.getItem('sgs_parent_id');
    const savedLang    = localStorage.getItem('sgs_language');

    const sid = savedStudent ? Number(savedStudent) : 0;
    const pid = savedParent  ? Number(savedParent)  : 0;

    if (sid > 0) setStudentId(sid);
    if (pid > 0) setParentId(pid);
    if (savedLang) setLanguage(savedLang);

    console.log('[SGS] localStorage → student_id:', sid, ' parent_id:', pid);
  }, []);

  const updateStudentId = (id: number) => {
    setStudentId(id);
    localStorage.setItem('sgs_student_id', id.toString());
    console.log('[SGS] studentId updated →', id);
  };

  const updateParentId = (id: number) => {
    setParentId(id);
    localStorage.setItem('sgs_parent_id', id.toString());
    console.log('[SGS] parentId updated →', id);
  };

  const updateLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('sgs_language', lang);
  };

  return {
    studentId,
    setStudentId: updateStudentId,
    parentId,
    setParentId: updateParentId,
    language,
    setLanguage: updateLanguage,
  };
}
