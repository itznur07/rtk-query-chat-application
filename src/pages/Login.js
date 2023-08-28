import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/images/lws-logo-light.svg";
import Error from "../components/ui/Error";
import { useLoginMutation } from "../features/auth/authApi";

export default function Login() {
  /** HOOK */
  const [login, { data, isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.user && data?.accessToken) {
      navigate("/inbox");
    }
  }, [data, navigate]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    const userInfo = {
      email,
      password,
    };

    login(userInfo);

    form.reset();
  };

  return (
    <div className='grid place-items-center h-screen bg-[#F9FAFB'>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <Link to='/'>
              <img
                className='mx-auto h-12 w-auto'
                src={logoImage}
                alt='Learn with sumit'
              />
            </Link>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
              Sign in to your account
            </h2>
          </div>
          <form onSubmit={handleLoginSubmit} className='mt-8 space-y-6'>
            <input type='hidden' name='remember' value='true' />
            <div className='rounded-md shadow-sm -space-y-px'>
              <div>
                <label htmlFor='email-address' className='sr-only'>
                  Email address
                </label>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm'
                  placeholder='Email address'
                />
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm'
                  placeholder='Password'
                />
              </div>
            </div>

            <div className='flex items-center justify-end'>
              <div className='text-sm'>
                <Link
                  to='/register'
                  className='font-medium text-violet-600 hover:text-violet-500'
                >
                  Register
                </Link>
              </div>
            </div>

            <div>
              <button
                disabled={isLoading}
                type='submit'
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
              >
                Sign in
              </button>
            </div>

            {error ? <Error message={error?.data} /> : ""}
          </form>
        </div>
      </div>
    </div>
  );
}
