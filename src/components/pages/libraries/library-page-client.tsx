"use client";

import { usePathname } from "next/navigation";
import MarkDownRenderer from "@/components/shared/markdown-renderer";
import { libraryInfo } from "@/content/library-info";
import { getLibraryContent } from "@/app/actions";

const LibraryPageClient = () => {
  const pathName = usePathname();
  const libraryName = pathName.split("/")[2];
  const version = pathName.split("/")[3];

  const activeLibraryInfo = libraryInfo.filter((library) => {
    return library.name === libraryName;
  });
  const activeLibraryVersions = activeLibraryInfo[0].versions;

  const activeLibraryMdContent = getLibraryContent(libraryName, "16.2.6");

  console.log(activeLibraryInfo);
  console.log(libraryName);
  console.log(version);

  return <MarkDownRenderer content={activeLibraryMdContent} />;
};

export default LibraryPageClient;
