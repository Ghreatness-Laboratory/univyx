import UniversityImage1 from "../../assets/images/academics/university1.png";
import UniversityImage2 from "../../assets/images/academics/university2.jpeg";
import UniversityImage3 from "../../assets/images/academics/university3.jpeg";
import AmbassadorImage1 from "../../assets/images/academics/ambassador1.png";
import AmbassadorImage2 from "../../assets/images/academics/ambassador2.png";
import AmbassadorImage3 from "../../assets/images/academics/ambassador3.png";
import { UniversityData } from "../../types/universityProfile";

export const universitiesData: UniversityData[] = [
  {
    id: 1,
    name: "Bells University of Technology",
    logo: UniversityImage1,
    location: "Ota, Ogun State",
    established: "2005",
    type: "Private",
    website: "https://bellsuniversity.edu.ng",
    description: "Bells University of Technology, the first private university of technology in Nigeria, is committed to producing graduates who are both academically and practically competent.",
    image: UniversityImage1,
    colleges: [
      {
        id: 1,
        name: "Computer Science",
        courses: [
          {
            id: 1,
            name: "B.Sc. Computer Science",
            description: "A program focused on computer theory, programming, and application development.",
            duration: "4 years"
          },
          {
            id: 2,
            name: "B.Sc. Software Engineering",
            description: "A program focused on designing, developing, and maintaining software systems.",
            duration: "4 years"
          }
        ],
        admissionRequirements: [
          "Five O'Level credit passes in English Language, Mathematics, Physics, and any two subjects from Chemistry, Biology, Economics, and Geography",
          "UTME score of at least 180",
          "Post-UTME screening"
        ]
      }
    ],
    ambassadors: [
      {
        id: 1,
        name: "Adewale Johnson",
        role: "BUESA secretary",
        image: AmbassadorImage1,
        email: "adewale.j@bells.edu.ng",
      },
      {
        id: 2,
        name: "Adewale Johnson",
        role: "BUSA President",
        image: AmbassadorImage2,
        email: "adewale.j@bells.edu.ng",
      },
      {
        id: 3,
        name: "Mary Jane",
        role: "Computer Science Ambassador",
        image: AmbassadorImage3,
        email: "adewale.j@bells.edu.ng",
      }
    ]
  },
  {
    id: 2,
    name: "Covenant University",
    logo: UniversityImage2,
    location: "Ota, Ogun State",
    established: "2002",
    type: "Private",
    website: "https://covenantuniversity.edu.ng",
    description: "Covenant University is a leading private Christian university in Nigeria, known for its strong emphasis on character, learning, and leadership development.",
    image: UniversityImage2,
    colleges: [
      {
        id: 1,
        name: "Architecture",
        courses: [
          {
            id: 1,
            name: "B.Sc. Architecture",
            description: "A program focused on architectural design, urban planning, and sustainable building sciences.",
            duration: "5 years"
          },
          {
            id: 2,
            name: "B.Sc. Interior Design",
            description: "A program focused on creating functional and aesthetic interior spaces.",
            duration: "4 years"
          }
        ],
        admissionRequirements: [
          "Five O'Level credit passes in English Language, Mathematics, Physics, and any two subjects from Chemistry, Biology, Economics, and Geography",
          "UTME score of at least 180",
          "Post-UTME screening",
          "Portfolio review"
        ]
      }
    ],
    ambassadors: [
      {
        id: 1,
        name: "Faith Adeleke",
        role: "CU Leadership Council President",
        image: AmbassadorImage1,
        email: "faith.a@covenant.edu.ng",
      },
      {
        id: 2,
        name: "Michael Okonkwo",
        role: "Campus Liaison Officer",
        image: AmbassadorImage2,
        email: "michael.o@covenant.edu.ng",
      },
      {
        id: 3,
        name: "Sarah Nwosu",
        role: "Architecture Student Ambassador",
        image: AmbassadorImage3,
        email: "sarah.n@covenant.edu.ng",
      }
    ]
  },
  {
    id: 3,
    name: "Babcock University",
    logo: UniversityImage3,
    location: "Ilishan-Remo, Ogun State",
    established: "1999",
    type: "Private",
    website: "https://www.babcock.edu.ng",
    description: "Babcock University is a private Christian co-educational university committed to holistic education and character development.",
    image: UniversityImage3,
    colleges: [
      {
        id: 1,
        name: "Medicine and Surgery",
        courses: [
          {
            id: 1,
            name: "MBBS Medicine and Surgery",
            description: "A comprehensive program focused on medical sciences, clinical practice, and patient care.",
            duration: "6 years"
          },
          {
            id: 2,
            name: "B.Sc. Medical Laboratory Science",
            description: "A program focused on laboratory diagnostics and medical research techniques.",
            duration: "5 years"
          }
        ],
        admissionRequirements: [
          "Five O'Level credit passes in English Language, Mathematics, Physics, Chemistry, and Biology",
          "UTME score of at least 200",
          "Post-UTME screening",
          "Medical aptitude test"
        ]
      }
    ],
    ambassadors: [
      {
        id: 1,
        name: "David Okonkwo",
        role: "Medical Students Association President",
        image: AmbassadorImage1,
        email: "david.o@babcock.edu.ng",
      },
      {
        id: 2,
        name: "Chioma Eze",
        role: "Research and Innovation Coordinator",
        image: AmbassadorImage2,
        email: "chioma.e@babcock.edu.ng",
      },
      {
        id: 3,
        name: "Emmanuel Adebayo",
        role: "Medical Sciences Ambassador",
        image: AmbassadorImage3,
        email: "emmanuel.a@babcock.edu.ng",
      }
    ]
  },
  {
    id: 4,
    name: "Adeleke University",
    logo: UniversityImage1,
    location: "Ede, Osun State",
    established: "2011",
    type: "Private",
    website: "https://adelekeuniversity.edu.ng",
    description: "Adeleke University is a private Christian university dedicated to providing quality education, innovative research, and character development.",
    image: UniversityImage1,
    colleges: [
      {
        id: 1,
        name: "Computer Engineering",
        courses: [
          {
            id: 1,
            name: "B.Eng. Computer Engineering",
            description: "A program focused on integrating hardware, software, and network systems design.",
            duration: "5 years"
          },
          {
            id: 2,
            name: "B.Sc. Telecommunications Engineering",
            description: "A program exploring advanced communication technologies and network infrastructures.",
            duration: "4 years"
          }
        ],
        admissionRequirements: [
          "Five O'Level credit passes in English Language, Mathematics, Physics, Chemistry, and Technical Drawing",
          "UTME score of at least 180",
          "Post-UTME screening",
          "Technical skills assessment"
        ]
      }
    ],
    ambassadors: [
      {
        id: 1,
        name: "Oluwaseun Adebayo",
        role: "Engineering Students Council President",
        image: AmbassadorImage1,
        email: "oluwaseun.a@adeleke.edu.ng",
      },
      {
        id: 2,
        name: "Funmilayo Oladipo",
        role: "Campus Innovation Lead",
        image: AmbassadorImage2,
        email: "funmilayo.o@adeleke.edu.ng",
      },
      {
        id: 3,
        name: "Michael Okonkwo",
        role: "Computer Engineering Ambassador",
        image: AmbassadorImage3,
        email: "michael.o@adeleke.edu.ng",
      }
    ]
  }
];