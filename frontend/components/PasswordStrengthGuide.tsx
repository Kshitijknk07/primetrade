export function PasswordStrengthGuide() {
  return (
    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 sticky top-8">
      <h3 className="text-sm font-semibold text-slate-900 mb-3">Strong Password Guide</h3>

      <div className="space-y-3">
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-700">Requirements:</h4>
          <ul className="text-xs text-slate-600 space-y-1">
            <li>✓ <strong>Minimum 12 characters</strong> (NIST standard)</li>
            <li>✓ <strong>Mix of types:</strong> uppercase, lowercase, numbers, symbols</li>
            <li>✓ <strong>Avoid:</strong> Dictionary words, birthdays, sequential numbers</li>
            <li>✓ <strong>Avoid:</strong> Keyboard patterns (qwerty, 123456)</li>
            <li>✓ <strong>Unique:</strong> Don't reuse passwords across sites</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-700">✅ Strong Examples:</h4>
          <ul className="text-xs text-slate-600 space-y-1 font-mono bg-white p-2 rounded border border-slate-100">
            <li>• Tr0pic@lSunset#42</li>
            <li>• M00nlight$Dance&93</li>
            <li>• Cr1mson!Wave*58</li>
            <li>• Phoenix@Rising#77</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-700">❌ Weak Examples:</h4>
          <ul className="text-xs text-slate-600 space-y-1 font-mono bg-red-50 p-2 rounded border border-red-200">
            <li>• password123 (dictionary + numbers)</li>
            <li>• qwerty789 (keyboard pattern)</li>
            <li>• john1995 (name + birthday)</li>
            <li>• abc123def (sequential)</li>
          </ul>
        </div>

        <div className="p-2 bg-blue-50 rounded border border-blue-200">
          <p className="text-xs text-blue-700">
            💡 <strong>Tip:</strong> Use a passphrase: "Butterfly-42-Purple!Sky" - longer, memorable, and secure.
          </p>
        </div>
      </div>
    </div>
  );
}
