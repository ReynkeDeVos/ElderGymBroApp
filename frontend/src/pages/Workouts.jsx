import { useState } from 'react';
import { exerciseImage, workoutImage } from '../utils/images';

const Toggle = ({ open, onClick }) => (
  <div
    onClick={onClick}
    className="mt-2 flex cursor-pointer flex-row justify-center rounded-md border-2 border-pink-800 bg-linear-to-tr from-gray-900 via-pink-900 to-zinc-900 text-center">
    <svg
      className={`size-8 text-teal-500 ${open ? 'rotate-180' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  </div>
);

const Field = ({ label, children }) => (
  <>
    <span className="font-extrabold text-teal-500">{label}: </span>
    <span className="text-slate-300 capitalize">{children}</span>
    <br />
  </>
);

const Exercise = ({ exercise, open, onToggle, className }) => (
  <div className={className}>
    <h6 className="mb-2 flex justify-center rounded-md text-base font-bold text-teal-500">{exercise.name}</h6>
    <img src={exerciseImage(exercise.name)} alt={exercise.name} className="rounded-md" />
    <Toggle open={open} onClick={onToggle} />
    {open && (
      <div className="mt-2">
        <Field label="Force">{exercise.force}</Field>
        <Field label="Mechanic">{exercise.mechanic}</Field>
        <Field label="Equipment">{exercise.equipment}</Field>
        <Field label="Primary Muscles">{exercise.primaryMuscles}</Field>
        {exercise.secondaryMuscles.length > 0 && (
          <Field label="Secondary Muscles">{exercise.secondaryMuscles.join(', ')}</Field>
        )}
        <h6 className="mt-2 font-extrabold text-teal-500">Instructions:</h6>
        <ul className="list-disc pl-5">
          {exercise.instructions.map((instruction) => (
            <li key={instruction} className="text-sm text-slate-300">
              {instruction}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const Workouts = ({ workouts }) => {
  const [openPlan, setOpenPlan] = useState(null);
  const [openDay, setOpenDay] = useState(null);
  const [openExercise, setOpenExercise] = useState(null);
  const toggle = (setter, value) => setter((current) => (current === value ? null : value));

  return (
    <div className="container mx-auto mb-8 flex min-h-svh flex-col items-center bg-linear-to-br from-black to-blue-950 p-4 pt-20">
      <h2 className="font-cthulhumbus cursor-default bg-linear-to-br from-white to-gray-400 bg-clip-text py-2 text-center text-3xl/tight font-medium text-transparent sm:py-4 md:pt-8 md:text-4xl/10">
        Workout Plans
      </h2>

      {workouts.map((plan) => (
        <div key={plan.id} className="mb-2">
          <div className="card m-4 cursor-pointer rounded-lg border-4 border-solid border-teal-800 bg-zinc-800 p-2 shadow-md">
            <div className="max-w-screen-sm rounded-t-lg">
              <h5 className="font-cthulhumbus mb-2 rounded-t-sm pb-1 text-center text-xl font-bold text-teal-500 shadow-2xl">
                {plan.name}
              </h5>
              <img src={workoutImage(plan.name)} alt={plan.name} className="rounded-t-lg shadow-lg" />
              <Toggle open={openPlan === plan.id} onClick={() => toggle(setOpenPlan, plan.id)} />
            </div>

            {openPlan === plan.id && (
              <div className="max-w-screen-sm">
                <div className="mt-2 mb-6 p-2">
                  <Field label="System">{plan.system}</Field>
                  <Field label="Aim">{plan.aim}</Field>
                  <Field label="Frequency">{plan.frequency}</Field>
                  <Field label="Workout Duration">{plan.planDuration}</Field>
                  <Field label="Rest Duration">{plan.breakDuration}</Field>
                  {plan.split && <Field label="Split">Yes</Field>}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {plan.split
                    ? plan.splits.map((split) => (
                        <div
                          key={split.day}
                          className="my-2 rounded-lg border-4 border-teal-800 bg-zinc-700 p-4 shadow-md">
                          <h6 className="font-cthulhumbus text-center text-xl font-semibold text-teal-500 capitalize">
                            Day {split.day}
                          </h6>
                          <Toggle open={openDay === split.day} onClick={() => toggle(setOpenDay, split.day)} />
                          {openDay === split.day &&
                            split.muscleGroups.flatMap((group) =>
                              group.exercises.map((ex) => {
                                const id = `${split.day}-${group.group}-${ex.id}`;
                                return (
                                  <Exercise
                                    key={id}
                                    className="my-3 text-slate-300"
                                    exercise={plan.exercises.find((e) => e.id === ex.id)}
                                    open={openExercise === id}
                                    onToggle={() => toggle(setOpenExercise, id)}
                                  />
                                );
                              }),
                            )}
                        </div>
                      ))
                    : plan.exercises.map((exercise) => (
                        <Exercise
                          key={exercise.id}
                          className="my-2 rounded-lg border-4 border-solid border-teal-800 bg-zinc-700 p-2 shadow-md"
                          exercise={exercise}
                          open={openExercise === exercise.id}
                          onToggle={() => toggle(setOpenExercise, exercise.id)}
                        />
                      ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Workouts;
