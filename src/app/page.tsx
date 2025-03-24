import { CardItem } from "@/components/card-item";
import {
  BookOpenText,
  Clock,
  Code,
  FileCode2,
  FileJson,
  Fingerprint,
  KeyRound,
  Regex,
  Timer,
} from "lucide-react";

const Home = () => {
  const items = [
    {
      title: "JSON Viewer",
      url: "/json",
      icon: FileJson,
      description: "Card Description",
    },
    {
      title: "Text Compare",
      url: "/text-compare",
      icon: BookOpenText,
      description: "Card Description",
    },
    {
      title: "Cron Calculator",
      url: "/cron",
      icon: Clock,
      description: "Card Description",
    },
    {
      title: "Regex Generator",
      url: "/regex",
      icon: Regex,
      description: "Card Description",
    },
    {
      title: "UUID Generator",
      url: "/uuid",
      icon: KeyRound,
      description: "Card Description",
    },
    {
      title: "Playground",
      url: "/playground",
      icon: Code,
      description: "Card Description",
    },
    {
      title: "Timestamp",
      url: "/timestamp",
      icon: Timer,
      description: "Card Description",
    },
    {
      title: "Base64 Converter",
      url: "/base64",
      icon: FileCode2,
      description: "Card Description",
    },
    {
      title: "JWT Decoder",
      url: "/jwt",
      icon: Fingerprint,
      description: "Card Description",
    },
  ];

  return (
    <div className="w-full min-h-screen max-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-1 flex-col justify-center items-center gap-3">
        <h1 className="text-5xl font-bold">Professional Developer Tools</h1>
        <p className="text-lg text-center">
          Streamline your workflow, enhance productivity, and ensure code
          quality with our tools.
        </p>
      </div>
      <div className="flex flex-wrap flex-1 w-full justify-evenly items-center gap-x-4 pb-4">
        {items.map((item, index) => (
          <CardItem
            key={index}
            title={item.title}
            url={item.url}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
