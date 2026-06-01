import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showStrength?: boolean;
}

export function PasswordInput({
  id,
  label,
  value,
  onChange,
  placeholder = '••••••••',
  showStrength = false,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = () => {
    if (!value) return null;
    if (value.length < 8) return { level: 'weak', color: 'text-red-600', bg: 'bg-red-100' };
    if (value.length < 12) return { level: 'good', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'strong', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="space-y-2.5">
      <Label htmlFor={id} className="text-sm font-medium text-slate-900">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-white border-slate-200 h-11 text-base rounded-xl focus:border-slate-400 focus:ring-0 transition-colors duration-200 pr-16"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 hover:text-black font-bold text-sm tracking-wide transition-colors duration-200"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      {showStrength && strength && (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                strength.level === 'weak'
                  ? 'w-1/3 bg-red-600'
                  : strength.level === 'good'
                    ? 'w-2/3 bg-yellow-600'
                    : 'w-full bg-green-600'
              }`}
            />
          </div>
          <span className={`text-xs font-medium ${strength.color}`}>
            {strength.level}
          </span>
        </div>
      )}
    </div>
  );
}
