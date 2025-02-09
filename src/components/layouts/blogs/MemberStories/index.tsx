import member1 from "../../../../assets/images/blogs/member1.png";
import member2 from "../../../../assets/images/blogs/member2.png";
import member3 from "../../../../assets/images/blogs/member3.png";
import MemberCard from "./MemberCard";

const memberStories = [
  {
    name: "Artemisia Udinese",
    profession: "Marketing Specialist",
    story:
      "As a long-time user of WDK AI ToolKit, I can confidently say that their solutions have revolutionised the way we operate.",
    memberImage: member1,
  },
  {
    name: "Artemisia Udinese",
    profession: "Marketing Specialist",
    story:
      "As a long-time user of WDK AI ToolKit, I can confidently say that their solutions have revolutionised the way we operate.",
    memberImage: member2,
  },
  {
    name: "Artemisia Udinese",
    profession: "Marketing Specialist",
    story:
      "As a long-time user of WDK AI ToolKit, I can confidently say that their solutions have revolutionised the way we operate.",
    memberImage: member3,
  },
];

export default function MemberStories() {
  return (
    <div>
      <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-3 md:gap-[50px] lg:px-6 xl:px-0 py-12 md:py-[100px]">
        <div className="flex flex-col gap-6 md:gap-5 text-center max-w-[753px] w-full mx-auto max-md:px-6">
          <h1 className="text-primary text-4xl md:text-5xl font-semibold md:font-medium leading-[44px] md:leading-[60px] tracking-[-0.72px] md:tracking-[-0.96px]">
            Member stories
          </h1>
          <p className="text-secondary text-base font-normal">
            The team at WDK AI ToolKit provided unparalleled support throughout
            our project. Their expertise and dedication were evident from day
            one, helping us navigate complex challenges.
          </p>
        </div>
        
        <div className="flex max-xl:flex-col gap-8 bg-[#F9F9FB] rounded-[20px] p-6 md:p-8">
          {memberStories.map((member, index) => (
            <div key={index}>
              <MemberCard props={member} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
