import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { LLMId } from ".";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { LLMS } from "@/lib/constants";

// Stats data
const stats = [
  { label: "Libraries", value: "142" },
  { label: "Categories", value: "38" },
  { label: "Tokens served", value: "4.2M" },
  { label: "Daily", value: "Updates" },
];

const StatsBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLLM, setSelectedLLM] = useState<LLMId>("claude");
  // Change LLM model
  const changeLLM = (llmId: LLMId) => {
    setSelectedLLM(llmId);
    setIsDropdownOpen(false);
  };

  const currentLLM = LLMS.find((l) => l.id === selectedLLM)!;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-foreground/20 pb-6 mb-6">
      <div className="flex items-center gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-xl font-medium  ">{stat.value}</div>
            <div className="text-[11px]  ">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* LLM Selector Dropdown */}
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 border-foreground/30  bg-gray-50 dark:bg-gray-900"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: currentLLM.dot }}
            />
            <span>Ask with {currentLLM.name}</span>
            <ChevronDown className="h-3.5 w-3.5 " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          {LLMS.map((llm) => (
            <DropdownMenuItem
              key={llm.id}
              onClick={() => changeLLM(llm.id)}
              className="flex items-center justify-between gap-2 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: llm.dot }}
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
