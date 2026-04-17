import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = imageUrlBuilder({ projectId, dataset });

export const urlFor = (source: Parameters<typeof builder.image>[0]) =>
  builder.image(source);
