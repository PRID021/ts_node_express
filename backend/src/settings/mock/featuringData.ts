import { Media } from "@models/media.model";

export const featuringDataFromMediaRecord = (mediaRecords: Media[]) => {
  const [desktop1, mobile1, desktop2, mobile2] = mediaRecords.map(
    (media) => media.id
  );
  return [
    {
      desktop_id: desktop1,
      mobile_id: mobile1,
      imageAlt: "Alt text for first feature",
      heading: "Learning that gets you",
      text: "Skills for your present (and your future). Get started with us.",
    },
    {
      desktop_id: desktop2,
      mobile_id: mobile2,
      imageAlt: "Alt text for second feature",
      heading: "Skills that drive you forward",
      text: "Technology and the world of work change fast — with us, you’re faster. Get the skills to achieve goals and stay competitive.",
    },
  ];
};
