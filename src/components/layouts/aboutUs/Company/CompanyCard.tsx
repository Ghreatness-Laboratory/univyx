export interface CompanyCardProps {
  image: string;
  name: string;
}
export default function CompanyCard(props: CompanyCardProps) {
  return (
    <div className="grid place-items-center h-[138px] w-[256px] rounded-[20px] border border-[#D6D6D6] mb-4">
      <div className="flex items-center gap-2.5">
        <img
          src={props.image}
          alt="Companies"
          width={166}
          height={35}
          className="w-[166PX] h-auto object-cover"
          aria-required
        />
        {props.name}
      </div>
    </div>
  );
}
