'use client';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
const Login = () => {
  const { status, data } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

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
      }
    } catch (error) {
      console.log(error);
      setErrors({ general: 'An unexpected error occurred.' });
    }
  };

  useEffect(() => {
    if (status === 'authenticated' && data) {
      redirect('/blog');
    }
  }, [status, data]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
        <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          Login
        </h4>
        <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
          Enter your details to login.
        </p>
        <form
          onSubmit={handleLogin}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`peer h-full w-full rounded-md border ${
                  errors.email ? 'border-red-500' : 'border-blue-gray-200'
                } bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                placeholder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Email
              </label>
              {errors.email && email.length > 0 ? null : (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
              {/* {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )} */}
            </div>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`peer h-full w-full rounded-md border ${
                  errors.password ? 'border-red-500' : 'border-blue-gray-200'
                } bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                placeholder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Password
              </label>
              {password && password.length > 0 && password.length < 6 && (
                <p className="text-red-500 text-xs mt-1">
                  {password.length} characters minimum.
                </p>
              )}
              {password.length > 0 && errors.password ? null : (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>
          <p className="text-right font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
            <Link
              className="font-semibold transition-colors hover:text-pink-500 "
              href="#"
            >
              &nbsp;Forgot your password
            </Link>
          </p>
          {errors?.general && (
            <p className="text-red-500 mx-3 text-xs mt-1">{errors.general}</p>
          )}
          <div className="inline-flex items-center">
            <label
              className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3"
              htmlFor="checkbox"
              data-ripple-dark="true"
            >
              <input
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                id="checkbox"
              />
              <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <label
              className="mt-px cursor-pointer select-none font-light text-gray-700"
              htmlFor="checkbox"
            >
              <p className="flex items-center font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
                I agree the
                <a
                  className="font-semibold transition-colors hover:text-pink-500"
                  href="#"
                >
                  &nbsp;Terms and Conditions
                </a>
              </p>
            </label>
          </div>
          <button
            className="mt-6 block w-full select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
            data-ripple-light="true"
          >
            Login
          </button>
          <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
            Do not have account?
            <Link
              className="font-semibold text-pink-500 transition-colors hover:text-blue-700"
              href="/register"
            >
              Sign up
            </Link>
          </p>
          <button
            className="mt-6 flex items-center justify-center gap-2 border w-full select-none rounded-lg bg-gray-250 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-light="true"
            onClick={() => signIn('github')}
          >
            <span className="">
              <Image
                src={`/github-mark.svg`}
                width={25}
                height={25}
                alt="Github Logo"
              />
            </span>
            Login with Github
          </button>
          <button
            className="mt-6 flex items-center justify-center gap-2 border  w-full  select-none rounded-lg bg-gray-50 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-light="true"
            onClick={() => signIn('google')}
          >
            <span className="">
              <Image
                src={`/google-icon.svg`}
                width={25}
                height={25}
                alt="Github Logo"
              />
            </span>
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
