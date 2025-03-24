import { Heading } from "@/components/headings";

const Base64 = () => {
  return (
    <div className="flex flex-col p-8 h-screen w-full max-w-[1600px] mx-auto">
      <Heading
        heading="Base64"
        subHeading="Paste your JSON to format and validate it"
      />
    </div>
  );
};

export default Base64;
