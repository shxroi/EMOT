import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import NavBar from '../components/NavBar';

const validationSchema = Yup.object({
  name: Yup.string().required('Nama is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: { name: string; email: string; password: string }) => {
    try {
      // Call your registration service here
      console.log('Register with:', values);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
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
              name: '',
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nama
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emot-primary focus:border-transparent"
                    placeholder="Masukkan nama anda"
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500 text-xs mt-1">{errors.name}</div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emot-primary focus:border-transparent"
                    placeholder="Masukkan email anda"
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-xs mt-1">{errors.email}</div>
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
                    Daftar
                  </button>
                </div>
                
                <div className="text-center text-sm mt-4">
                  <span className="text-gray-600">Sudah memiliki Akun? </span>
                  <RouterLink to="/login" className="text-emot-primary font-medium hover:underline">
                    Masuk
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

export default Register;
