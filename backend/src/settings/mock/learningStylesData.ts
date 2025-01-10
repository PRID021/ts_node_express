import { Media } from "@models/media.model";

export const learningStylesDataFromMediaRecord = (
  iconRecords: Media[],
  illusRecords: Media[]
) => {
  if (iconRecords.length !== illusRecords.length) {
    throw new Error("Mismatch between icon and illustration records count.");
  }

  const titles = [
    "Hands-on training",
    "Certification prep",
    "Insights and analytics",
    "Customizable content",
  ];

  const descriptions = [
    "Upskill effectively with AI-powered coding exercises, practice tests, and quizzes.",
    "Prep for industry-recognized certifications by solving real-world challenges and earn badges along the way.",
    "Fast-track goals with advanced insights plus a dedicated customer success team to help drive effective learning.",
    "Create tailored learning paths for team and organization goals and even host your own content and resources.",
  ];

  const learningStylesData = iconRecords.map((iconRecord, index) => {
    const illusRecord = illusRecords[index];
    return {
      icon_media_id: iconRecord.id,
      illus_media_id: illusRecord.id,
      title: titles[index],
      description: descriptions[index],
    };
  });

  console.log("iconRecords:", iconRecords);
  console.log("illusRecords:", illusRecords);

  return learningStylesData;
};
