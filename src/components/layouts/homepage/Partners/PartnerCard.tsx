export interface PartnerCardProps {
  image: string;
  name: string;
}
export default function PartnerCard(props: PartnerCardProps) {
  return (
    <div className="grid place-items-center h-[138px] w-[256px] rounded-[20px] border border-[#D6D6D6] mb-4">
      <div className="flex items-center gap-2.5">
        <img
          src={props.image}
          alt={`${props.name} partner`}
          width={166}
          height={35}
          className="w-[166PX] h-auto object-cover"
        />
        {props.name}
      </div>
    </div>
  );
}
