import { libraries } from "@/lib/libraries";

export const generateStaticParams = () => {
  return libraries.map((library) => ({ slug: `${library.slug}` }));
};

const Page = async ({}: { params: Promise<{ slug: string }> }) => {
  return (
    <div className="">
      <h2>Coming Soon</h2>
    </div>
  );
};

export default Page;
