"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Copy } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
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
import { libraries } from "@/lib/libraries";

interface LibraryPageClientProps {
  markdownContent: string;
  librarySlug: string;
  version: string;
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

const LibraryPageClient = ({
  markdownContent,
  librarySlug,
  version,
}: LibraryPageClientProps) => {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const activeLibrary = libraries.find((lib) => lib.slug === librarySlug);

  const handleCopy = () => {
    if (isCopied) return;
    navigator.clipboard.writeText("This is a dummy prompt to be copied.");
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const handleVersionChange = (targetVersion: string) => {
    // Navigates purely on the client side to the newly selected version page
    router.push(`/docs/${librarySlug}/${targetVersion}`);
  };

  return (
    <div className="">
      {/* Header part */}
      <section className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">
          {activeLibrary?.name} <span className="ml-1">v{version}</span>
        </h2>

        <div className="flex flex-wrap items-center gap-3 select-none">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Version ({version}) <ChevronDown />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
              <DropdownMenuGroup className="space-y-1">
                {activeLibrary?.versions?.map((version) => {
                  return (
                    <DropdownMenuItem
                      key={version}
                      className="my-2 cursor-pointer flex-col items-start gap-1 py-2"
                      onClick={() => handleVersionChange(version)}
                    >
                      <span className="flex items-center gap-2">{version}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

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
        <TabsList className="z-5">
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
