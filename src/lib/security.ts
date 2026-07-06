const SCRIPT_TAG_PATTERN = /<\/?script[\s\S]*?>/gi;
const EVENT_HANDLER_PATTERN = /\son\w+="[^"]*"/gi;

export function sanitizeText(input: string): string {
  return input
    .replace(SCRIPT_TAG_PATTERN, "")
    .replace(EVENT_HANDLER_PATTERN, "")
    .replace(/\u0000/g, "")
    .trim();
}

export function safeErrorMessage(error: unknown): string {
  if (error instanceof Error && process.env.NODE_ENV !== "production") {
    return error.message;
  }
  return "Request could not be completed safely.";
}
