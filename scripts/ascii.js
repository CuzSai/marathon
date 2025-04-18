import { getCurrentUser } from './users.js';

export function getAsciiArt() {
    const currentUser = getCurrentUser();
    const hidden = currentUser.name.toLowerCase() === "tycho"
      ? '<!-- Hidden Code: ARG-42-SECRET -->'
      : '<!-- Restricted -->';
    
    return `
         .-''''-.
        /        \\
        |        |
        \\        /
         '-.__.-'
${hidden}
    `;
}
