import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LLMId, LLMS } from "@/lib/constants";
import { SVGImage } from "@/components/shared/svg-image";
import { librariesCount, LIBRARY_CATEGORIES } from "@/lib/libraries";

// Stats data
const stats = [
  { label: "Libraries", value: librariesCount },
  { label: "Categories", value: LIBRARY_CATEGORIES.length },
];

type Props = {
  selectedLLM: LLMId;
  setSelectedLLM: (llmId: LLMId) => void;
};

const StatsBar = (props: Props) => {
  const { selectedLLM, setSelectedLLM } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Change LLM model
  const changeLLM = (llmId: LLMId) => {
    setSelectedLLM(llmId);
    setIsDropdownOpen(false);
  };

  const currentLLM = LLMS.find((l) => l.id === selectedLLM)!;

  return (
    <div className="border-foreground/20 mb-6 flex flex-col items-center justify-between gap-4 border-b pb-6 sm:flex-row">
      <div className="flex items-center gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-xl font-medium">{stat.value}</div>
            <div className="text-[11px]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* LLM Selector Dropdown */}
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="border-foreground/30 gap-2 bg-gray-50 dark:bg-gray-900"
          >
            <span>Ask with {currentLLM.name}</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
          {LLMS.map((llm) => {
            return (
              <DropdownMenuItem
                key={llm.id}
                onClick={() => changeLLM(llm.id)}
                className="flex cursor-pointer items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <span className="">
                    <SVGImage src={llm.logoUrl} alt={llm.name} />
                  </span>

                  <span>{llm.name}</span>
                </div>
                {selectedLLM === llm.id && (
                  <Check className="h-3.5 w-3.5 text-blue-600" />
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default StatsBar;
