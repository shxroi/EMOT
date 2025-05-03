import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import NavBar from '../components/NavBar';

const validationSchema = Yup.object({
  username: Yup.string().required('Nama is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      // Call your authentication service here
      console.log('Login with:', values);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <NavBar />
      
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm w-full max-w-md p-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-emot-primary">EMOT</h1>
            <p className="text-gray-600">Earn Money From Trash</p>
          </div>
          
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Nama
                  </label>
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emot-primary focus:border-transparent"
                    placeholder="Masukkan nama anda"
                  />
                  {errors.username && touched.username && (
                    <div className="text-red-500 text-xs mt-1">{errors.username}</div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emot-primary focus:border-transparent"
                    placeholder="Masukkan password anda"
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-xs mt-1">{errors.password}</div>
                  )}
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emot-primary text-white py-2 px-4 rounded-md hover:bg-emot-primary/90 transition-colors"
                  >
                    Masuk
                  </button>
                </div>
                
                <div className="text-center text-sm mt-4">
                  <span className="text-gray-600">Belum memiliki Akun? </span>
                  <RouterLink to="/register" className="text-emot-primary font-medium hover:underline">
                    Daftar
                  </RouterLink>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
