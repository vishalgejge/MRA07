// PasswordStrengthMeter.jsx
import React from 'react';

const PasswordStrengthMeter = ({ strength }) => {
  return (
    <div className="mt-1 flex items-center">
      <div className="relative w-full">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-red-100">
          <div
            style={{ width: `${strength}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500`}
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
