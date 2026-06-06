import { Suspense } from "react";
import DocsPage from "@/components/pages/docs";
import { libraries } from "@/lib/libraries";

export const generateStaticParams = () => {
  const paths: { slug: string; version: string }[] = [];

  libraries.forEach((library) => {
    library.versions?.forEach((version) => {
      paths.push({
        slug: library.slug,
        version,
      });
    });
  });

  return paths;
};

const Page = async ({
  params,
}: {
  params: Promise<{ slug: string; version: string }>;
}) => {
  const { slug, version } = await params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DocsPage libraryName={slug} version={version} />
    </Suspense>
  );
};

export default Page;
