"use client";

import React, { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputField = forwardRef(({ label, error, isPassword, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  // Determine input type based on password toggle state
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-2 w-full group">
      <label className="text-sm font-medium text-slate-300 ml-1 transition-colors group-focus-within:text-violet-400">
        {label}
      </label>
      
      <div className="relative">
        <input
          {...props}
          ref={ref}
          type={inputType}
          className={`
            w-full px-4 py-3 bg-slate-900 border rounded-xl outline-none transition-all duration-200 
            placeholder:text-slate-600 text-slate-100 backdrop-blur-sm
            ${error 
              ? "border-red-500 focus:ring-1 focus:ring-red-500/20" 
              : "border-slate-800 focus:border-violet-600 focus:ring-2 focus:ring-violet-600/10"
            }
            hover:border-slate-700
          `}
        />
        
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <span className="text-xs text-red-400 ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
});

InputField.displayName = "InputField";

export default InputField;