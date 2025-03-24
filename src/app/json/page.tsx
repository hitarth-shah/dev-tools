"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { JsonViewer, NamedColorspace } from "@textea/json-viewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const darkColorspace: NamedColorspace = {
  scheme: "DarkColorSpace",
  author: "Hitarth Shah",
  base00: "#2b303b", // Dark background
  base01: "#343d46", // Lighter background
  base02: "#4f5b66", // Selection background
  base03: "#65737e", // Comments
  base04: "#a7adba", // Dark foreground
  base05: "#c0c5ce", // Default foreground
  base06: "#dfe1e8", // Light foreground
  base07: "#eff1f5", // Light background
  base08: "#bf616a", // Variables
  base09: "#d08770", // Numbers
  base0A: "#ebcb8b", // Classes
  base0B: "#a3be8c", // Strings
  base0C: "#96b5b4", // Support
  base0D: "#8fa1b3", // Functions
  base0E: "#b48ead", // Keywords
  base0F: "#ab7967", // Deprecated
};

const Json = () => {
  const [json, setJson] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [error, setError] = useState("");

  const beautifyJSON = (jsonString: string) => {
    if (!jsonString.trim()) {
      setError("");
      return "";
    }
    try {
      const parsed = JSON.parse(jsonString);
      setError("");
      return JSON.stringify(parsed, null, 2);
    } catch (error) {
      setError("Invalid JSON format" + error);
      return "";
    }
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJson(value);
    setFormattedJson(beautifyJSON(value));
  };

  return (
    <div className="flex flex-col p-8 h-screen w-full max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-2 pb-8">
        <h5 className="text-4xl font-bold">JSON Formatter</h5>
        <p className="text-muted-foreground">
          Paste your JSON to format and validate it
        </p>
      </div>

      <Tabs defaultValue="code" className="flex-1">
        <div className="flex flex-col h-[calc(100vh-10rem)] gap-6">
          {/* Headers Row */}
          <div className="flex items-center gap-6">
            <Label className="text-lg font-medium w-1/2">Raw JSON</Label>
            <div className="flex items-center justify-between w-1/2">
              <Label className="text-lg font-medium">Formatted Output</Label>
              <TabsList>
                <TabsTrigger value="code">Code View</TabsTrigger>
                <TabsTrigger value="tree">Tree View</TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Content Row */}
          <div className="flex gap-6 flex-1">
            {/* Input Section */}
            <div className="w-1/2 rounded-lg bg-muted">
              <Textarea
                id="json-input"
                value={json}
                onChange={handleJsonChange}
                placeholder="Paste your JSON here..."
                className="h-full w-full resize-none font-mono text-sm bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            {/* Output Section */}
            <div className="w-1/2 rounded-lg bg-muted">
              <TabsContent value="tree" className="h-full m-0 p-4">
                {json && !error && (
                  <div className="h-full overflow-auto">
                    <JsonViewer
                      value={JSON.parse(json)}
                      theme={darkColorspace}
                      indentWidth={4}
                    />
                  </div>
                )}
                {!json && (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    Enter JSON to see tree view
                  </div>
                )}
              </TabsContent>

              <TabsContent value="code" className="h-full m-0">
                <Textarea
                  id="formatted-output"
                  value={formattedJson}
                  placeholder="Formatted JSON will appear here..."
                  className="h-full w-full resize-none font-mono text-sm bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  readOnly
                />
              </TabsContent>
            </div>
          </div>
          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
        </div>
      </Tabs>
    </div>
  );
};

export default Json;
