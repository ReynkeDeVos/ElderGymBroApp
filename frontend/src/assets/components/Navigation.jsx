import { Link, useLocation } from 'react-router';

export const BackLink = ({ to, className = '' }) => (
  <div className={`flex flex-row justify-start ${className}`}>
    <Link to={to} className="m-2 font-semibold text-teal-600 hover:text-teal-400" aria-label="Back">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>
    </Link>
  </div>
);

const steps = [
  ['/startyourjourney', 'Start'],
  ['/setyourgrind', 'Grind?'],
  ['/whatsyourgoal', 'Goal?'],
  ['/gender', 'Being?'],
  ['/setup', 'Go!'],
];

export const OnboardingSteps = () => {
  const { pathname } = useLocation();
  return (
    <ul className="steps">
      {steps.map(([to, label]) => (
        <li key={to} className={`step text-xs ${to === pathname ? 'step-info' : ''}`}>
          {to === pathname ? label : <Link to={to}>{label}</Link>}
        </li>
      ))}
    </ul>
  );
};
