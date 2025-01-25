import { salaryRange } from '@/app/data';

const SalaryCheckbox = () => {
  return (
    <div className="w-full bg-white">
      <div className="flex py-4 justify-between items-center">
        <div className="font-semibold text-blue-gray-900 text-md px-2">
          Salary
        </div>
        <div className="font-semibold text-gray-600 text-sm px-2">Clear</div>
      </div>
      {salaryRange.map((jobLevel) => (
        <label
          key={jobLevel.label}
          className="py-1 px-3 flex items-center w-full hover:bg-gray-200 cursor-pointer"
        >
          <input
            type="checkbox"
            value={jobLevel.label}
            className="mr-4 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="flex-1 text-gray-900 text-sm">{jobLevel.label}</span>
        </label>
      ))}
    </div>
  );
};

export default SalaryCheckbox;
