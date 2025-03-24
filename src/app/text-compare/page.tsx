"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { diff_match_patch } from "diff-match-patch";

const TextCompare = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [differences, setDifferences] = useState("");

  // Initialize diff-match-patch
  const dmp = new diff_match_patch();

  const compareTexts = () => {
    if (!text1 && !text2) {
      setDifferences("");
      return;
    }

    // Calculate diffs
    const diffs = dmp.diff_main(text1, text2);
    dmp.diff_cleanupSemantic(diffs);

    // Convert diffs to HTML with highlighting
    let formattedDiff = "";
    diffs.forEach(([type, text]) => {
      switch (type) {
        case 1: // Insertion
          formattedDiff += `<span class="bg-green-500/20 text-green-700 dark:text-green-300">${text}</span>`;
          break;
        case -1: // Deletion
          formattedDiff += `<span class="bg-red-500/20 text-red-700 dark:text-red-300">${text}</span>`;
          break;
        case 0: // No change
          formattedDiff += text;
          break;
      }
    });

    setDifferences(formattedDiff);
  };

  useEffect(() => {
    compareTexts();
  }, [text1, text2]);

  return (
    <div className="flex flex-col p-8 h-screen w-full max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-2 pb-8">
        <h5 className="text-4xl font-bold">Text Compare</h5>
        <p className="text-muted-foreground">
          Compare two texts and see their differences
        </p>
      </div>

      <div className="flex h-[calc(100vh-10rem)] gap-6">
        {/* Input Sections */}
        <div className="flex flex-col w-2/3 gap-6">
          {/* First Text Input */}
          <div className="flex flex-col flex-1 gap-4">
            <Label className="text-lg font-medium">Original Text</Label>
            <div className="flex-1 bg-muted rounded-lg">
              <Textarea
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                placeholder="Enter or paste original text here..."
                className="h-full w-full resize-none font-mono text-sm bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          {/* Second Text Input */}
          <div className="flex flex-col flex-1 gap-4">
            <Label className="text-lg font-medium">Modified Text</Label>
            <div className="flex-1 bg-muted rounded-lg">
              <Textarea
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                placeholder="Enter or paste modified text here..."
                className="h-full w-full resize-none font-mono text-sm bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>
        </div>

        {/* Differences Output */}
        <div className="flex flex-col w-1/3 gap-4">
          <Label className="text-lg font-medium">Differences</Label>
          <div className="flex-1 bg-muted rounded-lg p-4 overflow-auto">
            {differences ? (
              <div
                className="font-mono text-sm whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: differences }}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Enter text in both fields to see differences
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextCompare;
