export type Achievement = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  category: "Certificate" | "Award" | "Recognition" | "Event";
  image?: string;
  imageAlt?: string;
  href?: string;
  highlights?: string[];
};

export const achievements: Achievement[] = [
  {
    id: "national-innovation-day-2026",
    title: "3rd Place - Circular Economy Challenge",
    issuer: "2026 National Innovation Day in Caraga",
    date: "2026",
    description:
      "Recognized as part of the Surigao del Norte State University team that earned 3rd place in the student category of the Circular Economy Challenge.",
    category: "Award",
    image: "/images/achievements/national-innovation-day-2026.jpg",
    imageAlt:
      "National Innovation Day in Caraga recognition for Surigao del Norte State University, 3rd place in the Circular Economy Challenge student category.",
    highlights: ["3rd Place", "Student Category", "Team Achievement"],
  },
  {
    id: "icpep-se-digital-olympiads-2026",
    title: "Certificate of Participation - Tech Photography",
    issuer: "Institute of Computer Engineers of the Philippines - Student Edition",
    date: "March 25-31, 2026",
    description:
      "Received a certificate of participation for active involvement in the ICpEP.SE National Digital Olympiads 2026 under the Tech Photography category.",
    category: "Certificate",
    image: "/images/achievements/icpep-se-digital-olympiads-2026-certificate.png",
    imageAlt:
      "Certificate of Participation awarded to Khan L. Adjarani for Tech Photography in the ICpEP.SE National Digital Olympiads 2026.",
    href: "/documents/achievements/icpep-se-digital-olympiads-2026-certificate.pdf",
    highlights: ["Tech Photography", "National Event", "ICpEP.SE"],
  },
];
