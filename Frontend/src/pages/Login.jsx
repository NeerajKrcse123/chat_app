import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
const Login = () => {
  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (values) => {
      const userInfo = {
        email: values.email,
        password: values.password,
      };
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/login",
          userInfo
        );
        localStorage.setItem("user", JSON.stringify(response.data.user));
        Cookies.set("token", response.data.user.token);
        toast.success("data", response.data.message);
        window.location.href = "/";
      } catch (error) {
        const errorMessage = error?.response?.data?.error || "Unknown error";
        console.log("some issue", errorMessage);
        toast.error(`some issue: ${errorMessage}`);
      }
    },
  });
  return (
    <>
      <>
        <div className="flex justify-center items-center h-screen bg-custom-gradient">
          <form
            onSubmit={formik.handleSubmit}
            className="border border-white px-6 py-2 rounded-md space-y-3 w-[90%] md:w-[50%] lg:w-[30%] bg-slate-50 "
          >
            <h1 className="text-center text-2xl text-black">
              Chat <span className="text-black font-semibold">App</span>
            </h1>
            <h2 className="text-xl text-black font-semibold">Login</h2>

            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>

            <div className="flex justify-between items-center">
              <p className="text-black">
                New user ?
                <span
                  className="text-blue-500 underline cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </span>
              </p>
              <input
                type="submit"
                className="text-white bg-blue-700 px-2 py-1 rounded-md cursor-pointer"
                value="Login"
              />
            </div>
          </form>
        </div>
      </>
    </>
  );
};

export default Login;
