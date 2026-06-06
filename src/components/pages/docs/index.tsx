import { getLibraryContent } from "@/app/actions";
import LibraryPageClient from "./docs-page-client";

const DocsPage = async ({
  libraryName,
  version,
}: {
  libraryName: string;
  version: string;
}) => {
  const activeLibraryMdContent = await getLibraryContent(
    libraryName,
    version,
    0.2,
  );

  return <LibraryPageClient markdownContent={activeLibraryMdContent} />;
};

export default DocsPage;
