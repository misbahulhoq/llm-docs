import MarkDownRenderer from "@/components/shared/markdown-renderer";
import { libraryInfo } from "@/content/library-info";
import { getLibraryContent } from "@/app/actions";

const LibraryPage = async ({ libraryName }: { libraryName: string }) => {
  const activeLibraryInfo = libraryInfo.filter((library) => {
    return library.name === libraryName;
  });
  const activeLibraryVersions = activeLibraryInfo[0]?.versions;

  const activeLibraryMdContent = await getLibraryContent(libraryName, "16.2.6");

  console.log(activeLibraryInfo);
  console.log(libraryName);
  //   console.log(activeLibraryMdContent);

  return <MarkDownRenderer content={activeLibraryMdContent} />;
};

export default LibraryPage;
