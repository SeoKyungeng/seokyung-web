import type { StructureResolver } from "sanity/structure";
import { SINGLETON_TYPES } from "./schemas";

export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("콘텐츠")
    .items([
      S.listItem()
        .id("companyInfo")
        .title("회사 정보")
        .child(S.document().schemaType("companyInfo").documentId("companyInfo")),
      S.listItem()
        .id("ceo")
        .title("대표이사 인사말")
        .child(S.document().schemaType("ceo").documentId("ceo")),
      S.listItem()
        .id("philosophy")
        .title("경영 철학")
        .child(S.document().schemaType("philosophy").documentId("philosophy")),
      S.listItem()
        .id("organization")
        .title("조직도")
        .child(S.document().schemaType("organization").documentId("organization")),
      S.listItem()
        .id("sustainability")
        .title("지속가능경영 (ESG)")
        .child(S.document().schemaType("sustainability").documentId("sustainability")),
      S.listItem()
        .id("stats")
        .title("통계 지표")
        .child(S.document().schemaType("stats").documentId("stats")),
      S.divider(),
      S.documentTypeListItem("equipment").title("설비"),
      S.documentTypeListItem("product").title("가공 제품"),
      S.documentTypeListItem("client").title("고객사"),
    ]);

export const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export { SINGLETON_TYPES };
