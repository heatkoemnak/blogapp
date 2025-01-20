'use client';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { RegisterOptionModal } from '@/app/components/ui/modals/RegisterOptionModal';

const Login = () => {
  const { status, data } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [visiblePassword, setVisiblePassword] = useState(false);
  useEffect(() => {
    if (status === 'authenticated' && data) {
      router.push('/jobs');
    }
  }, [status, data]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!email) {
      setErrors({ email: 'This field is required.' });
      return;
    }

    if (!password) {
      setErrors({ password: 'This field is required.' });
      return;
    }
    if (password && password.length < 6) {
      setErrors({ password: '6 characters minimum.' });
      return;
    }
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res.error) {
        setErrors({ general: res.error });
      } else {
        setEmail('');
        setPassword('');
        setErrors({});
        router.push('/jobs');
      }
    } catch (error) {
      console.log(error);
      setErrors({ general: 'An unexpected error occurred.' });
    }
  };

  return (
    <div className="flex  min-h-screen items-center justify-center ">
      <div className="w-full max-w-lg space-y-2 p-8 mb-12 bg-white">
        <h2 class="text-2xl uppercase font-medium mb-1">Login</h2>
        <p class="text-gray-600 mb-6 text-sm">
          Welcome! So good to have you back!
        </p>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className=" py-2 -space-y-px">
            <div className="py-2">
              <label
                htmlFor="email"
                className="block mb-2 text-md font-medium text-gray-900 "
              >
                Email address
              </label>

              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className={` relative block w-full px-4 py-3 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm  focus:ring-0 focus:border-teal-500 placeholder-gray-400`}
                placeholder="yourname@gmail.com"
              />
              {errors.email && email.length > 0 && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div class="space-y-2 py-2">
              <div>
                <label for="password" class="text-gray-900 block">
                  {' '}
                  Password
                </label>

                <div class="relative">
                  <input
                    name="password"
                    type={visiblePassword ? `text` : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm  focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                    placeholder="••••••••"
                  />
                  <div
                    onClick={() => setVisiblePassword(!visiblePassword)}
                    class="cursor-pointer absolute inset-y-0 right-0 flex items-center px-8 text-gray-600 border-l border-gray-300"
                  >
                    {visiblePassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 text-gray-500 "
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z"
                          clipRule="evenodd"
                        />
                        <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                      </svg>
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label for="remember" className="text-gray-700 ">
                  Remember me
                </label>
              </div>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </a>
          </div>

          {errors?.general && (
            <p className="text-red-500 mx-3 text-xs mt-1">{errors.general}</p>
          )}

          <div>
            <button
              type="submit"
              class="block w-full py-2 text-center text-white bg-teal-500 border border-teal-500 rounded hover:bg-transparent hover:text-teal-500 transition uppercase font-roboto font-medium"
            >
              Login
            </button>
          </div>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              {`Don't `} have an account?{' '}
              {/* <Link
                href="/register.plan"
                className="font-medium text-indigo-600 hover:underline hover:text-indigo-500"
              >
                Register here
              </Link> */}
              <RegisterOptionModal />
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={() => signIn('google')}
              class=" text-black justify-center bg-blue-gray-50 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
            >
              <Image
                src={`/google-icon.svg`}
                width={20}
                height={20}
                alt="Google Logo"
                className="mr-2"
              />
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
