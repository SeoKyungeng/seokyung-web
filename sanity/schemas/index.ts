import { localizedString, localizedText } from "./objects/localized";
import { equipment } from "./documents/equipment";
import { product } from "./documents/product";
import { client } from "./documents/client";
import { companyInfo } from "./singletons/companyInfo";
import { ceo } from "./singletons/ceo";
import { philosophy } from "./singletons/philosophy";
import { organization } from "./singletons/organization";
import { sustainability } from "./singletons/sustainability";
import { stats } from "./singletons/stats";

export const schemaTypes = [
  localizedString,
  localizedText,
  equipment,
  product,
  client,
  companyInfo,
  ceo,
  philosophy,
  organization,
  sustainability,
  stats,
];

export const SINGLETON_TYPES = new Set([
  "companyInfo",
  "ceo",
  "philosophy",
  "organization",
  "sustainability",
  "stats",
]);
