export function isValidMermaidCode(code) {
  try {
    window.mermaid.mermaidAPI.parse(code);
    return { isValid: true, errorMessage: null };
  } catch (error) {
    return { isValid: false, errorMessage: error.str || error.message };
  }
}
