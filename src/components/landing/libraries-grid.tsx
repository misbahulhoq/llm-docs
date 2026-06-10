import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LLMId, LLMS } from "@/lib/constants";
import { buildLLMUrl } from "@/lib/helpers";
import { LibraryInfo } from "@/lib/libraries";
import Image from "next/image";

type Props = {
  filteredLibraries: LibraryInfo[];
  selectedLLM: LLMId;
};

const LibrariesGrid = (props: Props) => {
  const { filteredLibraries, selectedLLM } = props;

  const handleAsk = (libName: string) => {
    const url = buildLLMUrl(selectedLLM, libName);
    window.open(url, "_blank");
  };

  const currentLLM = LLMS.find((l) => l.id === selectedLLM)!;

  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium">Popular libraries</h2>
        </div>
      </div>

      {filteredLibraries.length === 0 ? (
        <div className="border-foreground/30 rounded-lg border border-dashed py-12 text-center">
          <p className="text-sm">
            No libraries found.{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => alert("Submit a library feature coming soon")}
            >
              Submit it ↗
            </button>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredLibraries.map((lib) => {
            return (
              <Card
                key={lib.name}
                className="group hover:border-foreground/30 border border-gray-100 transition-all"
              >
                <CardContent className="space-y-3 p-4">
                  <div className="flex items-center">
                    {/* <Image src={lib.} /> */}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{lib.name}</h3>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-muted-foreground font-mono text-[11px]">
                      {lib.versions && lib.versions[lib.versions.length - 1]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      size="sm"
                      className="h-8 flex-1 gap-1.5"
                      onClick={() => handleAsk(lib.name)}
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      Ask {currentLLM.name}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LibrariesGrid;
