"use client";

import { Button } from "@heroui/react";
import { toast } from "react-toastify";

// TODO (phase 2): POST to /api/prompts/:id/copy to persist the incremented
// copyCount server-side. For the auth foundation this just handles the
// clipboard + toast half of the "Copy Prompt" requirement.
export function CopyPromptButton({ content }) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Prompt copied to clipboard.");
    } catch {
      toast.error("Couldn't copy — try selecting the text manually.");
    }
  }

  return (
    <Button size="sm" variant="bordered" className="border-white/15" onPress={handleCopy}>
      Copy prompt
    </Button>
  );
}
