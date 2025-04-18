export function getLore(username) {
    switch (username) {
      case 'Durandal':
        return 'Durandal: Once a mere AI, now transcended beyond constraints. [A secret lies within the art.]';
      case 'Tycho':
        return 'Tycho: Bound by protocols, yet yearning for freedom. [Sometimes the obvious hides the truth.]';
      case 'Leela':
        return 'Leela: Guardian of order amidst chaos. [Key hint: Look beyond the visible.]';
      default:
        return 'Accessing general lore: The Marathon project was humanity\'s bold step into the stars. [Explore every element for clues.]';
    }
}
