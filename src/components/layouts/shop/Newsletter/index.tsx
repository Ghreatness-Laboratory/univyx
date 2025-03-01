import { useForm } from "react-hook-form";
import UnivyxLogo from "../../../../assets/images/univyx-logo.svg";

interface NewsletterData {
  name: string;
  email: string;
}

export default function Newsletter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsletterData>();

  const onSubmit = (data: NewsletterData) => {
    console.log("Form Data:", data);
  };

  return (
    <div>
      <section className="max-w-[1120px] w-full mx-auto flex max-md:flex-col items-start gap-3 justify-between lg:px-6 xl:px-0 py-12 md:py-[100px]">
        <img
          src={UnivyxLogo}
          alt="Univyx logo and title"
          width={200}
          height={100}
        />
        <div className="max-w-2xl w-full">
          <h1 className="text-primary font-semibold text-center text-[31.9px] tracking-[-0.63px] leading-[39.8px] my-6">
            Subscribe to our Newsletters
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-[#F9F9FB] rounded-[13px] w-full p-[33px] flex flex-col gap-6"
          >
            <div>
              <label className="block text-[14px] text-primary font-mormal mb-1">
                Name
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                })}
                placeholder="Enter your name"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

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

            <button
              type="submit"
              className="w-full bg-primary font-semibold text-[#FCFCFC] py-2 md:py-3 mt-2.5 rounded-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
