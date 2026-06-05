import { getLibraryContent } from "@/app/actions";
import LibraryPageClient from "./library-page-client";

const LibraryPage = async ({ libraryName }: { libraryName: string }) => {
  // NOTE: Hardcoding version and percentage for now
  const activeLibraryMdContent = await getLibraryContent(
    libraryName,
    "16.2.6",
    0.2,
  );

  return <LibraryPageClient markdownContent={activeLibraryMdContent} />;
};

export default LibraryPage;
