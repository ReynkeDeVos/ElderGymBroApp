const titles = [
  'Cannon Fodder Cultist',
  'Tentacle-Tickler Trainee',
  "Dagon's Dishwasher",
  "Cthulhu's Coffee Fetcher",
  'Eldritch Errand Runner',
  "Deep One's Doormat",
  'Paranormal Paper Pusher',
  "Great Old One's Goofball",
  'Tentacle Tamer',
  'Supreme Spookster',
];

// Karma needed to leave level 1, 2, 3, ...
const thresholds = [200, 400, 800, 1600, 3200, 6400, 12800, 256000, 512000, 1024000];

export const calculateLevel = (points) => thresholds.filter((t) => points >= t).length + 1;

export const getTitle = (points) => titles[Math.min(calculateLevel(points), titles.length) - 1];

// Percent of the way from the current level's threshold to the next one.
export const calculateProgressToNextLevel = (points) => {
  const next = thresholds.findIndex((t) => points < t);
  if (next === -1) return 100;
  const floor = thresholds[next - 1] ?? 0;
  return ((points - floor) / (thresholds[next] - floor)) * 100;
};

export const addKarma = (user, points) => {
  const awards = user.awards;
  awards.karmaPoints += points;
  awards.level = calculateLevel(awards.karmaPoints);
  awards.progress = calculateProgressToNextLevel(awards.karmaPoints);
  awards.title = getTitle(awards.karmaPoints);
};
