export type AchievementPhoto = {
  src: string;
  alt: string;
};

export type AchievementEvent = {
  id: string;
  title: string;
  organizer: string;
  date: string;
  description: string;
  photos: AchievementPhoto[];
  highlights?: string[];
};

export type AchievementCertificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  imageAlt: string;
  href?: string;
  highlights?: string[];
};

export const achievementEvents: AchievementEvent[] = [
  {
    id: "national-innovation-day-2026",
    title: "2026 National Innovation Day in Caraga",
    organizer: "Surigao del Norte State University Team",
    date: "2026",
    description:
      "Recognized as part of the Surigao del Norte State University team that earned 3rd place in the student category of the Circular Economy Challenge.",
    photos: [
      {
        src: "/images/achievements/national-innovation-day-2026.jpg",
        alt: "National Innovation Day in Caraga recognition for Surigao del Norte State University, 3rd place in the Circular Economy Challenge student category.",
      },
      {
        src: "/images/achievements/national-innovation-day-2026.jpg",
        alt: "Additional National Innovation Day in Caraga event photo placeholder. Replace this with your second event photo when ready.",
      },
    ],
    highlights: ["3rd Place", "Student Category", "Team Achievement"],
  },
];

export const achievementCertificates: AchievementCertificate[] = [
  {
    id: "icpep-se-digital-olympiads-2026",
    title: "Certificate of Participation - Tech Photography",
    issuer: "Institute of Computer Engineers of the Philippines - Student Edition",
    date: "March 25-31, 2026",
    description:
      "Received a certificate of participation for active involvement in the ICpEP.SE National Digital Olympiads 2026 under the Tech Photography category.",
    image: "/images/achievements/icpep-se-digital-olympiads-2026-certificate.png",
    imageAlt:
      "Certificate of Participation awarded to Khan L. Adjarani for Tech Photography in the ICpEP.SE National Digital Olympiads 2026.",
    href: "/documents/achievements/icpep-se-digital-olympiads-2026-certificate.pdf",
    highlights: ["Tech Photography", "National Event", "ICpEP.SE"],
  },
];
