'use client';

interface ChildSelectorProps {
  currentStudentId: number;
  onSelect: (id: number) => void;
  disabled?: boolean;
}

const DUMMY_STUDENTS = [
  { id: 1, name: "Rohit Sharma", class: "Class 10A" },
  { id: 2, name: "Jane Smith", class: "Class 10A" },
  { id: 3, name: "Bob Wilson", class: "Class 9B" }
];

export default function ChildSelector({ currentStudentId, onSelect, disabled }: ChildSelectorProps) {
  return (
    <div className="flex flex-col">
      <label className="text-xs font-semibold text-gray-500 mb-1 ml-1">Select Child</label>
      <div className="flex items-center bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold mr-2">
          {DUMMY_STUDENTS.find(s => s.id === currentStudentId)?.name.charAt(0) || 'S'}
        </div>
        <select
          value={currentStudentId}
          onChange={(e) => onSelect(Number(e.target.value))}
          disabled={disabled}
          className="bg-transparent focus:outline-none disabled:opacity-50 text-gray-800 text-sm font-semibold appearance-none pr-6 cursor-pointer"
          style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: '1em' }}
        >
          {DUMMY_STUDENTS.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name} • {student.class}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
