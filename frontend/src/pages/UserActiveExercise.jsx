import { useState } from 'react';
import skippingImage from '../assets/images/skipping.avif';

const inputClass =
  'block w-full rounded-md border-0 bg-white py-1.5 pr-20 pl-7 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6';

// Parent remounts this per exercise (key), so the set inputs start empty each time.
const UserActiveExercise = ({ exercise, isCompleted, onComplete, onSkip }) => {
  const [sets, setSets] = useState(() => Array.from({ length: exercise.sets || 0 }, () => ({ reps: '', weight: '' })));
  const [showSkipModal, setShowSkipModal] = useState(false);

  const handleSetChange = (index, field, value) =>
    setSets(sets.map((set, i) => (i === index ? { ...set, [field]: value } : set)));

  const muted = isCompleted ? 'text-gray-500' : '';

  return (
    <div
      className={`m-4 border-4 border-solid ${isCompleted ? 'border-gray-500 bg-gray-300' : 'border-teal-800 bg-zinc-800'} font-cthulhumbus rounded-lg p-4 text-white shadow-md`}>
      <h2 className={`${isCompleted ? 'text-gray-500' : 'text-teal-500'} py-2 pl-2 text-center text-lg`}>
        {exercise.name}
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onComplete(sets);
        }}>
        {sets.map((set, index) => (
          <div
            key={index}
            className={`m-2 border-2 border-solid ${isCompleted ? 'border-gray-500 bg-gray-400' : 'border-teal-800 bg-zinc-700'} rounded-md p-2`}>
            <p className={`${muted} pb-2`}>
              Set <span>{index + 1}</span>
            </p>
            {[
              ['weight', 'Weight (kg)'],
              ['reps', 'Reps'],
            ].map(([field, label]) => (
              <label key={field} className={`block ${muted}`}>
                {label}
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]+"
                  title="Whole numbers only"
                  required
                  value={set[field]}
                  onChange={(e) => handleSetChange(index, field, e.target.value)}
                  className={inputClass}
                  disabled={isCompleted}
                />
              </label>
            ))}
          </div>
        ))}

        <div className="flex justify-center space-x-4">
          <button
            type="button"
            className="rounded-md border-2 border-yellow-800 bg-linear-to-tr from-gray-900 via-yellow-600 to-zinc-900 px-4 py-2 text-white"
            onClick={() => setShowSkipModal(true)}>
            Skip
          </button>
          <button
            type="submit"
            className="rounded-md border-2 border-pink-800 bg-linear-to-tr from-gray-900 via-pink-600 to-zinc-900 px-4 py-2 text-white"
            disabled={isCompleted}>
            Complete Exercise
          </button>
        </div>
      </form>
      {showSkipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-center text-2xl font-bold text-red-500">Are you sure to skip this workout?</h2>
            <img src={skippingImage} alt="Skipping" className="mx-auto my-4 size-32" />
            <div className="flex justify-center space-x-4">
              <button className="rounded-md bg-red-500 px-4 py-2 text-white" onClick={() => setShowSkipModal(false)}>
                No, continue
              </button>
              <button
                className="rounded-md bg-green-500 px-4 py-2 text-white"
                onClick={() => {
                  setShowSkipModal(false);
                  onSkip();
                }}>
                Yes, skip this one
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserActiveExercise;
