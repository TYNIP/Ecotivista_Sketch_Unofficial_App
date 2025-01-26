/**
 * @param input - Input string to sanitize.
 * @returns sanitized string.
 */
export function sanitizeInput(input: string): string {
    if (!input || typeof input !== 'string') {
      return '';
    }
  
    const sanitized = input
      .trim() // Remove leading and trailing whitespace
      .replace(/[<>&"'`]/g, (char) => {
        const charMap: { [key: string]: string } = {
          '<': '&lt;',
          '>': '&gt;',
          '&': '&amp;',
          '"': '&quot;',
          "'": '&#39;',
          '`': '&#96;',
        };
        return charMap[char] || char;
      });
  
    return sanitized;
  }
  