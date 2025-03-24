"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Heading } from "@/components/headings";

const Uuid = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState("");

  // Generate single UUID
  const generateOne = () => {
    setUuids([uuidv4()]);
  };

  // Generate multiple UUIDs
  const generateMultiple = () => {
    if (!count || isNaN(Number(count)) || Number(count) <= 0) return;

    const newUuids = Array.from({ length: Number(count) }, () => uuidv4());
    setUuids(newUuids);
  };

  // Download UUIDs
  const downloadUuids = () => {
    if (uuids.length === 0) return;

    const content = uuids.join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `uuids-v4-${uuids.length}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col p-8 h-screen w-full max-w-[1600px] mx-auto">
      <Heading
        heading="UUID Generator"
        subHeading="Generate UUIDs (v4) - universally unique identifiers"
      />

      <div className="flex h-[calc(100vh-10rem)] gap-6">
        <div className="flex flex-col w-full gap-4">
          {/* Controls */}
          <div className="flex items-center gap-4">
            <Button onClick={generateOne} className="h-10">
              Generate One
            </Button>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                min="1"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                placeholder="Enter number of UUIDs"
                className="w-56 h-10 bg-transparent"
              />
              <Button onClick={generateMultiple} className="h-10">
                Generate Multiple
              </Button>
            </div>
            {uuids.length > 1 && (
              <Button
                onClick={downloadUuids}
                variant="outline"
                className="h-10 gap-2 ml-auto"
              >
                <Download size={16} />
                Download
              </Button>
            )}
          </div>

          {/* Output */}
          <div className="flex-1 bg-muted rounded-lg">
            <Textarea
              value={uuids.join("\n")}
              readOnly
              placeholder="Generated UUIDs will appear here..."
              className="h-full w-full resize-none font-mono text-sm bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uuid;
