import { sanityClient } from "./client";
import {
  ceoQuery,
  clientListQuery,
  companyInfoQuery,
  equipmentListQuery,
  organizationQuery,
  philosophyQuery,
  productListQuery,
  statsQuery,
  sustainabilityQuery,
} from "./queries";
import type {
  SanityCeo,
  SanityClient,
  SanityCompanyInfo,
  SanityEquipment,
  SanityOrganization,
  SanityPhilosophy,
  SanityProduct,
  SanityStats,
  SanitySustainability,
} from "./types";

/**
 * 모든 Sanity fetch는 ISR 1시간. 콘텐츠 변경 시 웹훅으로 revalidateTag 호출.
 * tags: 문서 타입별 → 해당 타입 수정 시에만 무효화.
 */
const nextOptions = (tag: string) => ({
  next: { revalidate: 3600, tags: [tag] },
});

export const getEquipmentList = () =>
  sanityClient.fetch<SanityEquipment[]>(
    equipmentListQuery,
    {},
    nextOptions("equipment")
  );

export const getProductList = () =>
  sanityClient.fetch<SanityProduct[]>(
    productListQuery,
    {},
    nextOptions("product")
  );

export const getClientList = () =>
  sanityClient.fetch<SanityClient[]>(
    clientListQuery,
    {},
    nextOptions("client")
  );

export const getCompanyInfo = () =>
  sanityClient.fetch<SanityCompanyInfo | null>(
    companyInfoQuery,
    {},
    nextOptions("companyInfo")
  );

export const getCeo = () =>
  sanityClient.fetch<SanityCeo | null>(ceoQuery, {}, nextOptions("ceo"));

export const getPhilosophy = () =>
  sanityClient.fetch<SanityPhilosophy | null>(
    philosophyQuery,
    {},
    nextOptions("philosophy")
  );

export const getOrganization = () =>
  sanityClient.fetch<SanityOrganization | null>(
    organizationQuery,
    {},
    nextOptions("organization")
  );

export const getSustainability = () =>
  sanityClient.fetch<SanitySustainability | null>(
    sustainabilityQuery,
    {},
    nextOptions("sustainability")
  );

export const getStats = () =>
  sanityClient.fetch<SanityStats | null>(
    statsQuery,
    {},
    nextOptions("stats")
  );
