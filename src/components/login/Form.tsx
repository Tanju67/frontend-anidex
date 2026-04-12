import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useState, type SyntheticEvent } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import img from "../../assets/login.jpg";
import {
  backendApi,
  useGoogleLoginMutation,
  useLoginMutation,
} from "../../shared/api/backendApi";
import { loginSchema } from "../../shared/schemas/backendSchema";
import type { MyBackendError } from "../../shared/types/types";
import Button from "../../shared/UIElements/button/Button";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import { toaster } from "../../shared/utils/toaster";

function Form() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const [googleLoginMutation] = useGoogleLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [demoLogin, setDemoLogin] = useState({
    email: "test@mail.com",
    password: "secret123",
  });

  const handleUserLogin = async () => {
    try {
      const response = await login(demoLogin).unwrap();
      localStorage.setItem("token", response.token);
      dispatch(backendApi.util.invalidateTags(["User"]));
      toaster("success", response.message);
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      const err = error as MyBackendError;
      const message = err.data?.message || "Something went wrong";
      toaster("error", message);
    }
  };

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    if (!credentialResponse.credential) {
      toaster("error", "No credential found");
      return;
    }
    try {
      const response = await googleLoginMutation({
        idToken: credentialResponse.credential,
      }).unwrap();

      localStorage.setItem("token", response.token);
      dispatch(backendApi.util.invalidateTags(["User"]));
      toaster("success", "Login successful");
      navigate("/");
    } catch (error) {
      const err = error as MyBackendError;
      const message = err.data?.message || "Something went wrong";
      toaster("error", message);
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const message = result.error.issues[0]?.message || "Invalid form data";
      toaster("error", message);
      return;
    }

    try {
      const response = await login(formData).unwrap();
      localStorage.setItem("token", response.token);
      console.log(response);
      dispatch(backendApi.util.invalidateTags(["User"]));
      toaster("success", response.message);
      setFormData({
        email: "",
        password: "",
      });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      const err = error as MyBackendError;
      const message = err.data?.message || "Something went wrong";
      toaster("error", message);
    }
  };
  return (
    <div className="container-box mt-28 md:mt-0">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            <div className="mb-8 text-center">
              <div className="group flex flex-col items-center gap-2">
                <h1 className="mt-2 text-2xl font-bold">Welcome Back</h1>
                <p className="text-text-dark">Sign in to your account</p>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label text-white">
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <IoMailSharp className="text-base-content/40 z-10 size-5" />
                  </div>
                  <input
                    type="email"
                    className={`input input-bordered focus:ring-main-btn w-full pl-10 text-black focus:ring-2`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label text-white">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaLock className="text-base-content/40 z-10 size-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`input input-bordered focus:ring-main-btn w-full pl-10 text-black focus:ring-2`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-base-content/40 z-10 size-5" />
                    ) : (
                      <FaEye className="text-base-content/40 z-10 size-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="bg-main-btn hover:bg-main-btn-hover content-center-x w-full p-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    Loading...
                  </>
                ) : (
                  "Sign In "
                )}
              </Button>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toaster("error", "Login failed")}
                useOneTap
                theme="outline"
                shape="rectangular"
                size="large"
                text="signin_with"
              />

              <div className="flex gap-2">
                <Button
                  type="button"
                  disabled={isLoading}
                  onClick={handleUserLogin}
                  className="content-center-x w-full bg-blue-600 p-2 text-xs text-white hover:bg-blue-700 md:text-sm lg:text-base"
                >
                  {isLoading ? (
                    <>
                      <Spinner />
                      Loading...
                    </>
                  ) : (
                    "Demo User Login"
                  )}
                </Button>
              </div>
            </form>

            <div className="text-center">
              <p className="text-text-dark">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="link link-secondary">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="content-center-x relative hidden lg:flex">
          <img
            src={img}
            alt=""
            className="h-200 w-200 -rotate-90 mask-[radial-gradient(45%_55%_at_60%_40%,white_40%,transparent_60%),radial-gradient(50%_40%_at_30%_50%,white_30%,transparent_50%),radial-gradient(35%_45%_at_50%_70%,white_25%,transparent_45%)] object-cover object-center contrast-80 grayscale-[0.3] saturate-30"
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_10%,black_70%)]" />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Form;
