export function formatQuery(text: string): string {
  return text.toLowerCase().trim().replace(" ", "-");
}
