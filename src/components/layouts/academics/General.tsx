import Notes from "../../../assets/images/academics/image 22.png";
import PastQuestions from "../../../assets/images/academics/image 23.png";
import Tutorials from "../../../assets/images/academics/image 24.png";
import Technology from "../../../assets/images/academics/image 25.png";
import Academics from "../../../assets/images/academics/image.png";

const departments = [
  {
    name: "Notes",
    image: Notes,
  },
  {
    name: "Past Questions",
    image: PastQuestions,
  },
  {
    name: "Tutorials",
    image: Tutorials,
  },
  {
    name: "Tecnology",
    image: Technology,
  },
];

export default function General() {
  return (
    <div
      data-testid="general"
      className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:py-[100px] px-6 lg:px-0"
    >
      <div>
        <h1 className="text-primary text-[32px] md:text-5xl font-semibold leading-tight">
          Unlock Your Academic Potential
        </h1>
        <p className="text-secondary text-lg mt-3">
          Access a variety of learning materials, from notes and past questions
          to tutorials.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-8 max-w-6xl mx-auto">
        <div className="w-full lg:w-2/3 flex flex-col border border-[#D6D6D6] rounded-[30px] overflow-hidden">
          <div className="max-h-[260px] overflow-hidden">
            <img
              src={Academics}
              alt="Academic book"
              className="w-full h-full object-cover "
            />
          </div>
          <div className="p-6">
            <h2 className="text-primary text-2xl font-semibold">
              Brain, Mind, and Body: The Healing of Trauma
            </h2>
            <p className="text-secondary mt-2 leading-relaxed">
              Explore the intricate connections between brain, mind, and body in
              the journey of trauma recovery.
            </p>

            <p className="text-[#616161] mt-6">
              Start learning with materials from these categories:
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              {departments.map((dept, index) => (
                <button
                  key={index}
                  className="py-2.5 px-5 text-[#475569] bg-[#E2E8F0] hover:bg-[#CBD5E1] transition-all duration-200 text-sm font-medium rounded-md"
                >
                  {dept.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="flex bg-white border border-[#D6D6D6] rounded-lg overflow-hidden"
            >
              <img
                src={dept.image}
                alt={dept.name}
                className="w-1/3 object-cover"
              />
              <div className="p-4 flex-1">
                <h3 className="text-primary text-lg font-semibold">
                  {dept.name}
                </h3>
                <p className="text-[#616161] text-sm mt-1">
                  Get access to {dept.name.toLowerCase()} and improve your
                  learning.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
