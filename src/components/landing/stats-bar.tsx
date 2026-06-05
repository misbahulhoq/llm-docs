import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { LLMId, LLMS } from "@/lib/constants";
import Image from "next/image";

// Stats data
const stats = [
  { label: "Libraries", value: "142" },
  { label: "Categories", value: "38" },
  { label: "Tokens served", value: "4.2M" },
  { label: "Daily", value: "Updates" },
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
          {LLMS.map((llm) => (
            <DropdownMenuItem
              key={llm.id}
              onClick={() => changeLLM(llm.id)}
              className="flex cursor-pointer items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={llm.logoUrl}
                  alt={llm.name}
                  width={20}
                  height={20}
                />
                <span>{llm.name}</span>
              </div>
              {selectedLLM === llm.id && (
                <Check className="h-3.5 w-3.5 text-blue-600" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default StatsBar;
