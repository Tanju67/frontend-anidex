import { useState, type SyntheticEvent } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Button from "../../shared/UIElements/button/Button";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import img from "../../assets/login.jpg";
import { FcGoogle } from "react-icons/fc";

function Form() {
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = false;
  const isLoadingUser = false;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleUserLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
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
                className="bg-main-btn hover:bg-main-btn-hover w-full p-2"
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
              <Button
                type="submit"
                className="w-full bg-gray-600 p-2 hover:bg-gray-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    Loading...
                  </>
                ) : (
                  <span className="content-center-x">
                    <FcGoogle className="mr-2 text-2xl" />
                    <span>Sign In whit Google</span>
                  </span>
                )}
              </Button>
              <div className="flex gap-2">
                <Button
                  type="button"
                  disabled={isLoadingUser}
                  // onClick={handleUserLogin}
                  className="w-full bg-blue-600 p-2 text-xs text-white hover:bg-blue-700 md:text-sm lg:text-base"
                >
                  {isLoadingUser ? (
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
