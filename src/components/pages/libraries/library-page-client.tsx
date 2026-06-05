"use client";

import { useState } from "react";

import { ChevronDown, Copy } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MarkDownRenderer from "@/components/shared/markdown-renderer";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface LibraryPageClientProps {
  markdownContent: string;
}

const llms = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    url: "https://chatgpt.com/",
    logoUrl: "/icons/llm/chatgpt.svg",
  },
  {
    id: "claude",
    name: "Claude",
    url: "https://claude.ai/",
    logoUrl: "/icons/llm/claude.svg",
  },
];

const LibraryPageClient = ({ markdownContent }: LibraryPageClientProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (isCopied) return;
    navigator.clipboard.writeText("This is a dummy prompt to be copied.");
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <div className="">
      {/* Header part */}
      <section className="mb-5 flex items-center justify-between">
        <h2>Library name and Version Goes Here</h2>
        <div className="flex items-center gap-3 select-none">
          <Button variant="outline" className="">
            Version
          </Button>

          <ButtonGroup className="select-none">
            <Button
              variant="outline"
              className={`${isCopied && "pointer-events-none cursor-not-allowed"}`}
              onClick={handleCopy}
              disabled={isCopied}
            >
              {isCopied ? (
                <span>✓ &nbsp; Copied</span>
              ) : (
                <>
                  <Copy className="h-4 w-4" /> Copy Prompt
                </>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" disabled={isCopied}>
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup className="space-y-1">
                  <DropdownMenuItem className="cursor-pointer py-2">
                    <Copy /> Copy Doc Url
                  </DropdownMenuItem>

                  {llms.map((llm) => {
                    const { id, logoUrl, name } = llm;
                    return (
                      <DropdownMenuItem
                        key={id}
                        className="my-2 cursor-pointer flex-col items-start gap-1 py-2"
                      >
                        <span className="flex items-center gap-2">
                          <Image
                            src={logoUrl}
                            alt={name}
                            height={16}
                            width={16}
                          />
                          Open in {name}
                        </span>
                        <span>Ask questions about this page.</span>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </div>
      </section>

      <Tabs defaultValue="raw" className="">
        <TabsList>
          <TabsTrigger value="raw" className="select-none">
            Raw
          </TabsTrigger>
          <TabsTrigger value="preview" className="select-none">
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="raw">
          <pre className="bg-secondary rounded p-4 font-mono text-sm break-words whitespace-pre-wrap">
            <code>{markdownContent}</code>
          </pre>
        </TabsContent>
        <TabsContent value="preview">
          <MarkDownRenderer content={markdownContent} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LibraryPageClient;
