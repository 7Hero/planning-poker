import { useState } from "react";

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 500);
  };

  return { copy, isCopied };
};

export { useCopyToClipboard }

