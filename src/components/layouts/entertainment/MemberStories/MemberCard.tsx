import Quote from "../../../../assets/images/entertainment/quote.svg";

interface MemberCardProps {
  props: {
    name: string;
    profession: string;
    story: string;
    memberImage: string;
  };
}
export default function MemberCard({
  props: { name, profession, story, memberImage },
}: MemberCardProps) {
  return (
    <div className="w-full sm:min-w-[330px] p-5 flex flex-col gap-6 rounded-[20px] bg-white">
      <div className="flex flex-col gap-5 leading-6">
        <img
          src={Quote}
          alt="Quote"
          width={48}
          height={48}
          className="flex self-start"
        />
        <p className="text-secondary text-base font-normal">{story}</p>
        <div className="flex justify-start gap-2">
          <img
            src={memberImage}
            alt={name}
            width={54}
            height={54}
            className="object-cover rounded-full"
          />
          <div>
            <h2 className="text-primary text-base font-medium ">{name}</h2>
            <p className="mt-1 font-normal text-xs text-secondary">
              {profession}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
