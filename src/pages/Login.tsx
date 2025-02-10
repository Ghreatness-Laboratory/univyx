import { apple, ghrestness, google } from "../assets/images";

export default function Login() {
  return (
    <div data-testid="login-page" className="flex flex-col items-center justify-center min-h-screen bg-white p-2">
      {/* Logo and Welcome Text */}
      <div className="mb-4 text-center">
        <img src={ghrestness} alt="Ghreatness Logo" className="w-18 h-14 object-cover mx-auto mb-3" />
        <h1 className="text-3xl font-semibold">Welcome back</h1>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md p-6 bg-gray-50 rounded-lg">
        <form className="space-y-4">
          <div>
            <label  className="block text-sm mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter 8 characters"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500">Or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <button className="w-full flex items-center justify-center bg-black text-white gap-2 p-3 border rounded-lg">
            <img src={google} alt="google" className="w-5 h-5 object-cover" />
            Login with Google
          </button>
          <button className="w-full flex items-center bg-black text-white justify-center gap-2 p-3 border rounded-lg">
            <img src={apple} alt="apple" className="w-5 h-5 object-cover" />
            Login with Apple
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account? 
          <a href="/join" className="text-black font-semibold">
            Join Us
          </a>
        </p>
      </div>
    </div>
  );
}
