import { cache } from "react";
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
  DocumentType,
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

const fetchWithTag = <T>(query: string, tag: DocumentType) =>
  sanityClient.fetch<T>(
    query,
    {},
    { next: { revalidate: 3600, tags: [tag] } }
  );

export const getEquipmentList = cache(() =>
  fetchWithTag<SanityEquipment[]>(equipmentListQuery, "equipment")
);

export const getProductList = cache(() =>
  fetchWithTag<SanityProduct[]>(productListQuery, "product")
);

export const getClientList = cache(() =>
  fetchWithTag<SanityClient[]>(clientListQuery, "client")
);

export const getCompanyInfo = cache(() =>
  fetchWithTag<SanityCompanyInfo | null>(companyInfoQuery, "companyInfo")
);

export const getCeo = cache(() =>
  fetchWithTag<SanityCeo | null>(ceoQuery, "ceo")
);

export const getPhilosophy = cache(() =>
  fetchWithTag<SanityPhilosophy | null>(philosophyQuery, "philosophy")
);

export const getOrganization = cache(() =>
  fetchWithTag<SanityOrganization | null>(organizationQuery, "organization")
);

export const getSustainability = cache(() =>
  fetchWithTag<SanitySustainability | null>(
    sustainabilityQuery,
    "sustainability"
  )
);

export const getStats = cache(() =>
  fetchWithTag<SanityStats | null>(statsQuery, "stats")
);
