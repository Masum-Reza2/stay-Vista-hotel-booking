import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios';
import useGlobal from '../../hooks/useGlobal';
import useSecureAxios from '../../hooks/useSecureAxios';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';

const SignUp = () => {
  const secureAxios = useSecureAxios();

  const { createUser, signInWithGoogle, updateUserProfile, loading, setLoading } = useGlobal();
  const navigate = useNavigate();

  const handleGoogle = async () => {
    const user = await signInWithGoogle();

    const currrentUser = {
      email: user?.user?.email,
      role: 'guest',
      status: 'verified'
    }
    const dbRes = await secureAxios.put(`/users/${user?.user?.email}`, currrentUser)
    console.log('saved to db', dbRes);
    toast.success('Sign up successful.')

    setLoading(false)

    navigate('/login')
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    // new learning image uploading
    // >>>>>>>>>>>>>>>image Operation<<<<<<<<<<<<<
    // an asynchronous operation will be apply there
    const image = form.image.files[0];
    const imageForm = new FormData();
    imageForm.append('image', image)
    try {
      setLoading(true)
      // upload image
      const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api_key}`, imageForm);

      // user registration
      const user = await createUser(email, password);
      // update profile
      await updateUserProfile(name, data?.data?.display_url);

      // save user data in the database
      const currrentUser = {
        email,
        role: 'guest',
        status: 'verified'
      }
      const dbRes = await secureAxios.put(`/users/${email}`, currrentUser)
      console.log('saved to db', dbRes);
      toast.success('Sign up successful.')

      setLoading(false)

      navigate('/login')

      // token should be control from a central place like onAuthStateChanged

    } catch (error) {
      console.log(error)
      toast.error(error.mesage)
    }
    // >>>>>>>>>>>>>>>image Operation<<<<<<<<<<<<<


    console.log('im waiting for the image to be upload')

  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to StayVista</p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='new-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-rose-500 w-full rounded-md py-3 text-white'
            >
              {
                loading ? <TbFidgetSpinner className='animate-spin m-auto text-lg' /> : 'Continue'
              }
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div onClick={handleGoogle} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp
