"use client";

import { Heading } from "@/components/headings";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Image from "next/image";

type EncodableInput = string | Blob | ArrayBuffer | object;
type DecodedOutput = string | Uint8Array | Blob;

const Base64 = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [pdf, setPdf] = useState<string | null>(null);

  const encodeToBase64 = async (input: EncodableInput): Promise<string> => {
    try {
      // Handle JSON objects
      if (
        typeof input === "object" &&
        !(input instanceof Blob) &&
        !(input instanceof ArrayBuffer)
      ) {
        input = JSON.stringify(input);
      }

      // Handle string inputs
      if (typeof input === "string") {
        const encoder = new TextEncoder();
        const encoded = encoder.encode(input);
        return btoa(String.fromCharCode(...encoded));
      }

      // Handle Blobs
      if (input instanceof Blob) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(input);
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(",")[1]);
          };
          reader.onerror = () => reject(new Error("Failed to read blob"));
        });
      }

      // Handle ArrayBuffers
      if (input instanceof ArrayBuffer) {
        const bytes = new Uint8Array(input);
        return btoa(String.fromCharCode(...bytes));
      }

      throw new Error("Unsupported input type");
    } catch (err) {
      throw new Error(
        `Encoding failed: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }
  };

  const detectBase64Type = (decodedBytes: Uint8Array): string => {
    const magicNumbers = {
      pdf: [0x25, 0x50, 0x44, 0x46], // %PDF
      png: [0x89, 0x50, 0x4e, 0x47], // PNG
      jpg: [0xff, 0xd8, 0xff], // JPG
      gif: [0x47, 0x49, 0x46], // GIF
    };

    for (const [type, signature] of Object.entries(magicNumbers)) {
      if (
        decodedBytes
          .slice(0, signature.length)
          .every((b, i) => b === signature[i])
      ) {
        return type;
      }
    }

    // If mostly printable characters, assume it's text
    const textSample = new TextDecoder().decode(decodedBytes.slice(0, 100));
    if (/^[\x20-\x7E\s]+$/.test(textSample)) return "text";

    return "unknown";
  };

  const decodeFromBase64 = async (
    base64: string
  ): Promise<{ type: string; data: DecodedOutput }> => {
    try {
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);

      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const detectedType = detectBase64Type(bytes);

      switch (detectedType) {
        case "text":
          return { type: "Text", data: new TextDecoder().decode(bytes) };
        case "pdf":
          return {
            type: "PDF",
            data: new Blob([bytes], { type: "application/pdf" }),
          };
        case "png":
        case "jpg":
        case "gif":
          return {
            type: "Image",
            data: new Blob([bytes], { type: `image/${detectedType}` }),
          };
        default:
          return { type: "Unknown", data: bytes };
      }
    } catch (err) {
      throw new Error(
        `Decoding failed: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }
  };

  const handleInputChange = async (value: string) => {
    setInputText(value);
    setError(null);

    try {
      if (mode === "encode") {
        const encoded = await encodeToBase64(value);
        setOutputText(encoded);
      } else {
        const { type, data } = await decodeFromBase64(value);
        console.log("type: ", type);
        setOutputText(
          type === "Text" ? (data as string) : `Decoded as ${type}`
        );
        if (type === "Image") {
          setImageSrc(`data:image/${type};base64,${value}`);
        }

        // Set PDF only for PDF type
        if (type === "PDF") {
          setPdf(URL.createObjectURL(data as Blob));
        }
      }
    } catch (err) {
      setOutputText("");
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      console.log("file", file);
      try {
        const encodedFile = await encodeToBase64(selectedFile);
        setOutputText(encodedFile);

        setInputText(
          selectedFile.name + " " + Math.round(selectedFile.size / 1024) + "Kb"
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An unknown error occurred while encoding the file."
        );
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
  };

  const handleModeChange = (newMode: "encode" | "decode") => {
    if (newMode !== mode) {
      // Swap values of inputText and outputText when changing modes
      setInputText(outputText);
      setOutputText(inputText);
    }
    setMode(newMode);
  };

  return (
    <div className="flex flex-col p-8 h-screen w-full max-w-[1600px] mx-auto">
      <Heading
        heading="Base64"
        subHeading="Encode and decode text using Base64 encoding"
      />

      <div className="flex gap-4 mb-6">
        <Button
          variant={`${mode === "encode" ? "default" : "outline"}`}
          className={"px-4 py-2 rounded-lg "}
          onClick={() => handleModeChange("encode")}
        >
          Encode
        </Button>
        <Button
          variant={`${mode === "decode" ? "default" : "outline"}`}
          className={"px-4 py-2 rounded-lg "}
          onClick={() => handleModeChange("decode")}
        >
          Decode
        </Button>
        {mode === "encode" && (
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-2 border rounded p-2"
          />
        )}
      </div>

      <div className="flex h-[calc(100vh-10rem)] gap-6">
        <div className="flex flex-col w-full gap-6">
          <div className="flex flex-col flex-1 gap-4">
            <Label className="text-lg font-medium">
              {mode === "encode"
                ? "Text to Encode or Upload File"
                : "Base64 to Decode"}
            </Label>
            <div className="flex-1 bg-muted rounded-lg">
              <Textarea
                value={inputText}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={
                  mode === "encode"
                    ? "Enter text or paste data here..."
                    : "Paste Base64 string here..."
                }
                className="h-full w-full resize-none font-mono text-sm bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          <div className="flex flex-col flex-1 gap-4">
            <Label className="text-lg font-medium">
              {mode === "encode" ? "Base64 Output" : "Decoded Text"}
            </Label>
            <div className="flex-1 bg-muted rounded-lg">
              {pdf ? (
                <embed
                  src={pdf}
                  type="application/pdf"
                  width="100%"
                  height="700px"
                />
              ) : imageSrc ? (
                <Image
                  src={imageSrc}
                  alt="Decoded Image"
                  className="max-w-full h-auto"
                  width={500} // Adjust width as needed
                  height={500} // Adjust height as needed
                />
              ) : (
                <Textarea
                  value={outputText}
                  placeholder={
                    mode === "encode"
                      ? "Encoded result will appear here..."
                      : "Decoded result will appear here..."
                  }
                  className="h-full w-full resize-none font-mono text-sm bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  readOnly
                />
              )}
            </div>
            {outputText && (
              <Button onClick={copyToClipboard} className="h-10">
                Copy to Clipboard
              </Button>
            )}
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Base64;
