import { useState } from "react";
import { CopyButton } from "./copy-button";
import { Wand2, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { ActionButton } from "./action-button";
import { Textarea } from "./ui/textarea";

interface CustomizationDropdownProps {
  onModify: (instructions: string) => void;
  onRegenerate: (instructions: string) => void;
  onCopy: () => void;
  lastGenerated: Date;
}

export function CustomizationDropdown({
  onModify,
  onRegenerate,
  onCopy,
  lastGenerated,
}: CustomizationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [instructions, setInstructions] = useState("");

  return (
    <div className="mt-4 w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border-[3px] border-black bg-purple-300 px-4 py-2 font-medium text-black transition-colors hover:bg-purple-400"
      >
        <span>Customize Diagram</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Textarea
              placeholder="Custom instructions (optional)"
              className="min-h-[38px] flex-1 resize-y rounded-md border-[3px] border-black px-3 py-2 text-base font-bold shadow-[4px_4px_0_0_#000000] placeholder:text-base placeholder:font-normal placeholder:text-gray-700 sm:min-h-[46px] sm:px-4 sm:py-3 sm:text-lg sm:placeholder:text-lg"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={1}
            />

            <ActionButton
              onClick={() => onModify(instructions)}
              icon={Wand2}
              tooltipText="Modify existing diagram"
            />

            <ActionButton
              onClick={() => onRegenerate(instructions)}
              icon={RefreshCw}
              tooltipText="Regenerate with/without custom instructions"
            />

            <CopyButton onClick={onCopy} />
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-700">
              Last generated: {lastGenerated.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}