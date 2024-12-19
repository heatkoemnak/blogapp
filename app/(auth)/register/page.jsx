'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [visiblePassword, setVisiblePassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const randomImageUrl = `https://picsum.photos/200/200`;
    setErrors({});

    if (!name) {
      setErrors((prev) => ({ ...prev, name: 'This field is required.' }));
      return;
    }
    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'This field is required.' }));
      return;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'This field is required.' }));
      return;
    }
    if (password.length < 6) {
      setErrors((prev) => ({ ...prev, password: '6 characters minimum.' }));
      return;
    }
    if (!confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: 'This field is required.',
      }));
      return;
    }
    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: 'Passwords do not match',
      }));
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password,randomImageUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: data.message });
        }
      } else {
        router.push('/login');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      console.log(error);
      setErrors({ general: 'An unexpected error occurred.' });
    }
  };

  return (
    <div className="flex  min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-2xl space-y-2 p-8 mb-12 bg-white">
        <div>
          <h4 className="text-center text-2xl font-extrabold text-gray-900">
            Create your account
          </h4>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your details to register an account.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-2 flex-col  rounded-xl shadow-sm ">
            <div>
              <label
                htmlFor="name"
                className="block font-medium text-sm mb-2 text-gray-800"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`relative block w-full px-3 py-2 border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } placeholder-neutral-500 text-gray-900 rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email-address" className="block font-medium text-sm mb-2 text-gray-800">Your email</label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`relative block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } placeholder-neutral-500 text-gray-900 rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="relative">
              <label htmlFor="password" className="block font-medium text-sm mb-2 text-gray-800">Password</label>
              <input
                id="password"
                name="password"
                type={visiblePassword ? `text` : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`relative block w-full px-3 py-2 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } placeholder-neutral-500 text-gray-900 rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
              />
              <button
                className="absolute top-1 right-3 z-10"
                onClick={() => setVisiblePassword(!visiblePassword)}
              >
                {visiblePassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-4 "
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z"
                      clipRule="evenodd"
                    />
                    <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-4  text-gray-800"
                  >
                    <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    <path
                      fillRule="evenodd"
                      d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirm-password" className="block font-medium text-sm mb-2 text-gray-800">Confirm Password</label>
              <input
                id="confirm-password"
                name="confirm-password"
                type={visiblePassword ? `text` : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`relative block w-full px-3 py-2 border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } placeholder-neutral-500 text-gray-900 rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Confirm Password"
              />

              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {errors.general && (
            <p className="text-red-500 mx-3 text-xs mt-1">{errors.general}</p>
          )}

          <div className="inline-flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <Link
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Terms and Conditions
              </Link>
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="bg-orange-500 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
