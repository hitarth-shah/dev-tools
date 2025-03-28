"use client";
import { Heading } from "@/components/headings";
import AceEditor from "react-ace";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { marked } from "marked";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import { useState } from "react";

const Markdownpage = () => {
  const [markdown, setMarkdown] = useState("");
  const onChange = (value) => {
    const html = marked.parse(value);
    console.log("html: ", html);
    console.log("html type: ", typeof html);
    setMarkdown(value);
    console.log("value", typeof value);
  };

  return (
    <div className="flex flex-col p-8 h-screen w-full max-w-[1600px] mx-auto">
      <Heading heading="Markdown" subHeading="..." />

      <div className="flex gap-6 h-full">
        {/* Markdown Editor */}
        <AceEditor
          placeholder="# Type Markdown here..."
          mode="markdown"
          theme="twilight"
          name="markdown-editor"
          height="100%"
          width="43%"
          focus={true}
          onChange={onChange}
          fontSize={14}
          lineHeight={19}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={markdown}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            enableMobileMenu: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />

        <div className="w-1/2 p-4 border rounded-lg bg-gray-100 overflow-auto text-black">
          <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default Markdownpage;
