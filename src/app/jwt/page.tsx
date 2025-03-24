"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";

const Jwt = () => {
  const [token, setToken] = useState("");
  const [decodedHeader, setDecodedHeader] = useState("");
  const [decodedPayload, setDecodedPayload] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const beautifyJSON = (jsonString: string) => {
    try {
      const parsed =
        typeof jsonString === "string" ? JSON.parse(jsonString) : jsonString;
      return JSON.stringify(parsed, null, 4)
        .replace(/[{]/g, "{")
        .replace(/[}]/g, "}")
        .replace(/[:,]/g, (match) => `${match} `);
    } catch (error) {
      return jsonString;
    }
  };

  const decodeJWT = (token: string) => {
    try {
      if (!token) {
        setDecodedHeader("");
        setDecodedPayload("");
        return;
      }

      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format");
      }

      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));

      setDecodedHeader(beautifyJSON(header));
      setDecodedPayload(beautifyJSON(payload));
    } catch (error) {
      setDecodedHeader("Invalid JWT Header");
      setDecodedPayload("Invalid JWT Payload");
    }
  };

  const handleTokenChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setToken(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      decodeJWT(value);
    }, 500);
  };

  return (
    <div className="flex flex-col p-8 h-screen w-full max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-2 pb-8">
        <h5 className="text-4xl font-bold">JWT Decoder</h5>
        <p className="text-muted-foreground">
          Paste your JWT token to decode and validate it
        </p>
      </div>

      <div className="flex h-[calc(100vh-10rem)] gap-6">
        {/* Input Section */}
        <div className="flex flex-col w-1/2 gap-2">
          <Label className="text-lg font-medium">JWT Token</Label>
          <div className="flex-1 bg-muted rounded-lg">
            <Textarea
              id="jwt-input"
              value={token}
              onChange={handleTokenChange}
              placeholder="Paste your JWT token here..."
              className="h-full w-full resize-none font-mono text-sm bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Output Section */}
        <div className="flex flex-col w-1/2 gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-lg font-medium">Header</Label>
            <div className="bg-muted rounded-lg h-[140px]">
              <Textarea
                id="header-output"
                value={decodedHeader}
                placeholder="Decoded header will appear here..."
                className="h-full w-full resize-none font-mono text-sm bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                readOnly
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <Label className="text-lg font-medium">Payload</Label>
            <div className="flex-1 bg-muted rounded-lg">
              <Textarea
                id="payload-output"
                value={decodedPayload}
                placeholder="Decoded payload will appear here..."
                className="h-full w-full resize-none font-mono text-sm bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jwt;
