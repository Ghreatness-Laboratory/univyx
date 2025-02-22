"use client";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import UnivyxLogo from "../../assets/images/univyx-logo.svg";
import Button from "../../components/common/Button";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div data-testid="login-page" className="max-w-[70%] w-full mx-auto">
      <img
        src={UnivyxLogo}
        alt="Univyx logo and title"
        width={200}
        height={100}
        className="mx-auto"
      />

      <h1 className="py-3 text-3xl font-semibold text-center">
        Welcome back to Univyx
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4 pt-5"
      >
        <div>
          <label className="block text-[14px] text-primary font-mormal mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-[14px] text-primary font-mormal mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            placeholder="Enter your password"
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-[#FCFCFC] py-3 mt-2.5 rounded-md"
        >
          Login
        </button>
      </form>

      <p className="text-[#808080] text-sm text-center pt-2">
        Don't have an account?{" "}
        <Link
          to={"?auth=signup"}
          className="text-black hover:underline transition-all duration-300"
        >
          Sign up
        </Link>
      </p>

      <div className="flex items-center justify-center my-8">
        <div className="w-full h-px bg-gray-300"></div>
        <span className="mx-2 text-gray-500">Or</span>
        <div className="w-full h-px bg-gray-300"></div>
      </div>

      <div className="flex max-sm:flex-col items-center justify-center gap-[13px] text-[#FCFCFC] text-sm font-semibold leading-4">
        <Button
          href=""
          className="flex gap-1 items-center p-2.5 rounded-[5.35px]"
          isIconOnly={false}
          ariaLabel="Login with google"
          data-testid="login-link"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
          >
            <path
              d="M6.84492 2.39642C8.09951 2.39642 9.24812 2.84084 10.1505 3.57827L9.0405 4.68827C8.42844 4.23054 7.66939 3.95698 6.84492 3.95698C4.81347 3.95698 3.16645 5.604 3.16645 7.63544C3.16645 9.66689 4.81347 11.3139 6.84492 11.3139C8.44717 11.3139 9.80488 10.2882 10.31 8.86175L10.4679 8.41572H9.99474H7.17932V6.85516H11.5266V6.87829H11.861H12.0283C12.0646 7.12592 12.0839 7.37862 12.0839 7.63544C12.0839 10.5287 9.73816 12.8745 6.84492 12.8745C3.95168 12.8745 1.60589 10.5287 1.60589 7.63544C1.60589 4.7422 3.95168 2.39642 6.84492 2.39642Z"
              fill="#FBC02D"
              stroke="#FCFCFC"
              stroke-width="0.668812"
            />
            <path
              d="M1.91406 5.04129L3.74521 6.38421C4.24069 5.1575 5.44065 4.29138 6.84488 4.29138C7.69733 4.29138 8.47288 4.61297 9.06338 5.13827L10.6398 3.56182C9.64441 2.63412 8.31292 2.06201 6.84488 2.06201C4.70412 2.06201 2.84761 3.27061 1.91406 5.04129Z"
              fill="#E53935"
            />
            <path
              d="M6.84505 13.2088C8.28467 13.2088 9.59275 12.6579 10.5818 11.762L8.85678 10.3023C8.29721 10.7261 7.60164 10.9795 6.84505 10.9795C5.3954 10.9795 4.16451 10.0551 3.7008 8.76514L1.8833 10.1655C2.8057 11.9704 4.67893 13.2088 6.84505 13.2088Z"
              fill="#4CAF50"
            />
            <path
              d="M12.31 6.54413L12.3055 6.521H11.8611H6.84497V8.75037H9.9948C9.77409 9.37376 9.37308 9.91131 8.85586 10.3028L8.8567 10.3023L10.5817 11.762C10.4596 11.8729 12.4184 10.4224 12.4184 7.63568C12.4184 7.26198 12.3799 6.8972 12.31 6.54413Z"
              fill="#1565C0"
            />
          </svg>
          <p>Login with Google</p>
        </Button>
        <Button
          href=""
          className="flex gap-1 items-center p-2.5 rounded-[5.35px]"
          isIconOnly={false}
          ariaLabel="Login with apple"
          data-testid="login-link"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
          >
            <path
              d="M9.74356 13.1845L9.74428 13.1845C10.0722 13.1822 10.4031 13.0012 10.7383 12.68C11.0705 12.3616 11.3663 11.9445 11.6241 11.5524C11.9183 11.104 12.059 10.8425 12.2581 10.4117C10.3195 9.41145 9.98474 6.61277 11.8309 5.27291C11.2814 4.72598 10.6021 4.43037 9.97964 4.43037C9.48329 4.43037 9.13237 4.54631 8.79308 4.67348C8.76099 4.68551 8.72851 4.69788 8.69563 4.7104C8.38727 4.82782 8.0424 4.95914 7.6273 4.95914C7.18923 4.95914 6.80341 4.82101 6.4625 4.69895C6.44082 4.69119 6.41931 4.68349 6.39799 4.6759C6.0297 4.54474 5.68582 4.43141 5.26765 4.43141C4.4558 4.43141 3.54935 4.93217 2.9648 5.83206L2.96465 5.8323C2.5698 6.43905 2.38713 7.34914 2.49009 8.39762C2.59247 9.44013 2.97524 10.5899 3.67221 11.6515L9.74356 13.1845ZM9.74356 13.1845C9.44768 13.1872 9.26493 13.1039 8.99844 12.9825C8.97905 12.9736 8.95922 12.9646 8.93886 12.9554C8.62682 12.814 8.25094 12.6631 7.63656 12.6683C7.02523 12.6713 6.64684 12.8222 6.33255 12.961C6.31512 12.9687 6.29806 12.9762 6.28131 12.9837C6.00637 13.1055 5.8164 13.1897 5.51461 13.1866L5.51423 13.1866M9.74356 13.1845L5.51423 13.1866M5.51423 13.1866C5.1758 13.1835 4.85209 13.0166 4.53284 12.7243M5.51423 13.1866L4.53284 12.7243M4.53284 12.7243C4.21338 12.4318 3.92888 12.0414 3.67242 11.6518L4.53284 12.7243ZM8.87141 3.00747L8.87111 3.00785C8.55324 3.41732 8.04728 3.73733 7.54465 3.82061C7.5557 3.32781 7.79897 2.82047 8.1122 2.43901C8.43364 2.04987 8.94411 1.73395 9.4222 1.60628C9.40098 2.11912 9.17322 2.61987 8.87141 3.00747Z"
              fill="white"
              stroke="#FCFCFC"
              stroke-width="0.668812"
            />
          </svg>
          <p>Login with Apple</p>
        </Button>
      </div>
    </div>
  );
}