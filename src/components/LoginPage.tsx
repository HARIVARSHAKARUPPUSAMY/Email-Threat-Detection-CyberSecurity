import React, { useState, useEffect } from 'react';

interface LoginPageProps {
  onLoginSuccess: (email: string) => void;
}

interface StoredUser {
  email: string;
  password: string;
}

const STORAGE_KEY = 'threat_intel_registered_users_v2';

const DEFAULT_USERS: StoredUser[] = [
  {
    email: 'karuppusamyhari3@gmail.com',
    password: 'password123',
  },
  {
    email: 'admin@gmail.com',
    password: 'admin123',
  },
];

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Initialize and load registered users from localStorage
  const getRegisteredUsers = (): StoredUser[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load users from localStorage:', e);
    }
    // Default fallback
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessNotice(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    const cleanConfirm = confirmPassword.trim();

    if (!cleanEmail || !cleanPassword) {
      setError('Please enter both Email ID and Password.');
      return;
    }

    if (cleanPassword.length < 4) {
      setError('Password must contain at least 4 characters.');
      return;
    }

    if (cleanPassword !== cleanConfirm) {
      setError('Passwords do not match. Please re-enter confirm password.');
      return;
    }

    const currentUsers = getRegisteredUsers();
    const userExists = currentUsers.some(
      (u) => u.email.toLowerCase() === cleanEmail
    );

    if (userExists) {
      setError('This Email ID is already registered! Please login directly.');
      return;
    }

    // Add new user to storage
    const updatedUsers = [...currentUsers, { email: cleanEmail, password: cleanPassword }];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));

    setSuccessNotice(`Registration successful! You can now log in using ${cleanEmail}.`);
    setIsRegisterMode(false);
    setPassword('');
    setConfirmPassword('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessNotice(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError('Please enter your registered Email ID and Password.');
      return;
    }

    const currentUsers = getRegisteredUsers();
    const matchedUser = currentUsers.find(
      (u) => u.email.toLowerCase() === cleanEmail
    );

    if (!matchedUser) {
      setError('This Email ID is not registered! Please register first using "Create an account".');
      return;
    }

    if (matchedUser.password !== cleanPassword) {
      setError('Incorrect password! Please enter the correct password registered for this account.');
      return;
    }

    // Success!
    onLoginSuccess(matchedUser.email);
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center p-4">
      {/* Flipkart-Style Two-Column Auth Box */}
      <div className="w-full max-w-2xl bg-white rounded shadow-md overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Flipkart Blue Branding Banner */}
        <div className="w-full md:w-5/12 bg-[#2874f0] p-8 text-white flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {isRegisterMode ? 'Register' : 'Login'}
            </h1>
            <p className="text-sm text-blue-100 mt-3 leading-relaxed">
              {isRegisterMode
                ? 'Create your account to start analyzing email threats, tracking origin IPs, and generating forensic reports.'
                : 'Get access to your Email Threat Analysis, IP Geolocation, and Forensic Reports.'}
            </p>
          </div>

          <div className="mt-8 md:mt-0 text-xs text-blue-200">
            Secure Authentication Portal
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-7/12 p-8 flex flex-col justify-between">
          <div>
            {/* Feedback messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded leading-relaxed">
                {error}
              </div>
            )}

            {successNotice && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded leading-relaxed">
                {successNotice}
              </div>
            )}

            {isRegisterMode ? (
              /* REGISTER FORM */
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Enter Email ID
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Create Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 4 characters"
                    required
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    required
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 fk-btn-primary text-sm font-semibold rounded uppercase tracking-wider cursor-pointer"
                  >
                    CONTINUE & REGISTER
                  </button>
                </div>
              </form>
            ) : (
              /* LOGIN FORM */
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Enter Registered Email ID
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    required
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Enter Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition"
                  />
                </div>

                <p className="text-[11px] text-gray-500 leading-normal">
                  You must enter your registered Email ID and password to access the portal.
                </p>

                <div>
                  <button
                    type="submit"
                    className="w-full py-3 fk-btn-primary text-sm font-semibold rounded uppercase tracking-wider cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Toggle between Login and Register Mode */}
          <div className="mt-8 pt-4 border-t border-gray-100 text-center">
            {isRegisterMode ? (
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(false);
                  setError(null);
                  setSuccessNotice(null);
                }}
                className="text-xs text-[#2874f0] font-semibold hover:underline cursor-pointer"
              >
                Existing User? Log in
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(true);
                  setError(null);
                  setSuccessNotice(null);
                }}
                className="text-xs text-[#2874f0] font-semibold hover:underline cursor-pointer"
              >
                New user? Create an account / Register
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
