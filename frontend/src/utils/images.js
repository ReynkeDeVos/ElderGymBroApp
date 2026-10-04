const workoutImages = import.meta.glob('../assets/images/workouts/*.jpg', { eager: true, import: 'default' });
const exerciseImages = import.meta.glob('../assets/images/Exercises/*/images/0.jpg', {
  eager: true,
  import: 'default',
});

// Image paths contain the workout/exercise name with spaces as underscores.
const find = (images, name) => images[Object.keys(images).find((path) => path.includes(name.replaceAll(' ', '_')))];

export const workoutImage = (name) => find(workoutImages, name);
export const exerciseImage = (name) => find(exerciseImages, name);
