import LibraryPage from "@/components/pages/libraries";
import { libraries } from "@/lib/libraries";
import { Suspense } from "react";

export const generateStaticParams = () => {
  return libraries.map((library) => ({ slug: `${library.slug}` }));
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LibraryPage libraryName={slug} />
      </Suspense>
    </div>
  );
};

export default Page;
