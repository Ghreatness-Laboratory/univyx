import Button from "../../../common/Button";

export interface BlogsProps {
  category: string;
  title: string;
  date: string;
  author: string;
  blogPicture: string;
}

export default function BlogCard({
  category,
  title,
  date,
  author,
  blogPicture,
}: BlogsProps) {
  return (
    <div className="flex flex-col gap-6 p-5 rounded-[20px] border border-[#D6D6D6] min-w-[412px]">
      <img
        src={blogPicture}
        alt={title}
        width={372}
        height={420}
        className="rounded-[20px]"
      />

      <div className="flex flex-col gap-3">
        <Button className="rounded-[7px] px-2.5 py-[5px] cursor-default">
          <p className="font-normal text-[14px] leading-5">{category}</p>
        </Button>
        <h2 className="text-2xl font-medium leading-8 text-primary">{title}</h2>
      </div>

      <div className="flex gap-2.5 font-normal text-[14px] leading-5 text-secondary">
        <span className="flex gap-2.5 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8.00033 8.66659V5.99992M14.0003 3.99992L12.667 2.66659M6.66699 1.33325H9.33366M8.00033 13.9999C5.05481 13.9999 2.66699 11.6121 2.66699 8.66659C2.66699 5.72107 5.05481 3.33325 8.00033 3.33325C10.9458 3.33325 13.3337 5.72107 13.3337 8.66659C13.3337 11.6121 10.9458 13.9999 8.00033 13.9999Z"
              stroke="#808080"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p>{date}</p>
        </span>
        <span className="flex gap-2.5 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M12.6663 14C12.6663 11.4227 10.577 9.33333 7.99967 9.33333C5.42235 9.33333 3.33301 11.4227 3.33301 14M7.99967 7.33333C6.52692 7.33333 5.33301 6.13943 5.33301 4.66667C5.33301 3.19391 6.52692 2 7.99967 2C9.47243 2 10.6663 3.19391 10.6663 4.66667C10.6663 6.13943 9.47243 7.33333 7.99967 7.33333Z"
              stroke="#808080"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p>{author}</p>
        </span>
      </div>
    </div>
  );
}
