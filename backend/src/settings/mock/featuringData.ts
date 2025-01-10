import { Media } from "@models/media.model";

export const featuringDataFromMediaRecord = (mediaRecords: Media[]) => {
  if (mediaRecords.length < 4) {
    throw new Error("Insufficient media records provided.");
  }

  const ids = mediaRecords.map((media) => media.id);

  const features = [
    {
      imageAlt: "Alt text for first feature",
      heading: "Learning that gets you",
      text: "Skills for your present (and your future). Get started with us.",
    },
    {
      imageAlt: "Alt text for second feature",
      heading: "Skills that drive you forward",
      text: "Technology and the world of work change fast — with us, you’re faster. Get the skills to achieve goals and stay competitive.",
    },
  ];

  return features.map((feature, index) => ({
    desktop_id: ids[index * 2],
    mobile_id: ids[index * 2 + 1],
    ...feature,
  }));
};
