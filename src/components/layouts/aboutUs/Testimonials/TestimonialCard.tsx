export interface TestimonialCardProps {
  name: string;
  profession: string;
  comment: string;
  image: string;
  rating?: number;
}

const star = (
  <svg
    role="img"
    aria-label="star"
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      d="M17.9394 6.74962C17.7934 6.27908 17.4062 5.93822 16.9398 5.86682L12.2156 5.1473L10.1027 0.664928C9.68578 -0.221643 8.30168 -0.221643 7.88472 0.664928L5.77184 5.1473L1.05891 5.86682C0.592606 5.93802 0.205445 6.28028 0.0606387 6.74962C-0.0853061 7.22015 0.0371053 7.73483 0.374923 8.07828L3.79163 11.5587L2.98637 16.4846C2.90723 16.9706 3.09777 17.4632 3.47867 17.7536C3.8609 18.0428 4.36554 18.0803 4.78249 17.8508L8.99326 15.524L13.2165 17.8508C13.3972 17.9507 13.5952 18 13.7918 18C14.0478 18 14.3038 17.9171 14.5217 17.7538C14.9028 17.4621 15.0931 16.9708 15.014 16.4848L14.2087 11.5589L17.6254 8.07848C17.9629 7.73602 18.0853 7.21895 17.9394 6.74962Z"
      fill="#F5C74D"
    />
  </svg>
);

export default function TestimonialCard({
  name,
  profession,
  comment,
  image,
  rating = 5
}: TestimonialCardProps) {
  return (
    <div
      data-testid="testimonial-card"
      className="lg:max-w-[352px] w-full p-8 bg-[#F9F9FB] flex flex-col"
    >
      <ul className="flex items-center gap-1">
        <span className="sr-only">Ratings</span>
        {Array.from({ length: rating }, (_, index) => (
          <li key={index}>{star}</li>
        ))}
      </ul>

      <p className="text-primary text-base font-normal pt-5 pb-8">
        {comment}
      </p>

      <div className="flex gap-2 items-center pt-6 border-t">
        <div className="w-[54px] h-[54px] rounded-[4px]">
          <img
            src={image}
            alt="Profile picture"
            width={54}
            height={54}
            className="w-full h-full object-cover rounded-[4px]"
          />
        </div>
        <div className="flex flex-col gap-[3px] ">
          <h6 className="text-primary text-base font-medium">{name}</h6>
          <p className="text-secondary text-xs leading-[18px] font-normal">
            {profession}
          </p>
        </div>
      </div>
    </div>
  );
}