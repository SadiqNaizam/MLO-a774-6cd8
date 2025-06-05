import React from 'react';
import { cn } from '@/lib/utils';

interface VisualProgressTrackerProps {
  totalSteps: number;
  currentStep: number;
  stepLabels?: string[]; // Optional labels for each step
  className?: string;
}

const VisualProgressTracker: React.FC<VisualProgressTrackerProps> = ({
  totalSteps,
  currentStep,
  stepLabels,
  className,
}) => {
  console.log(`Rendering VisualProgressTracker: Step ${currentStep} of ${totalSteps}`);

  if (totalSteps <= 0 || currentStep < 0 || currentStep > totalSteps) {
    console.warn('VisualProgressTracker: Invalid props provided for steps.');
    return null; // Or some error indication
  }

  return (
    <div className={cn('flex flex-col w-full', className)}>
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <React.Fragment key={`step-container-${stepNumber}`}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300',
                    {
                      'bg-blue-600 border-blue-600 text-white': isActive,
                      'bg-green-500 border-green-500 text-white': isCompleted,
                      'bg-gray-200 border-gray-300 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400': !isActive && !isCompleted,
                    }
                  )}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </div>
                {stepLabels && stepLabels[index] && (
                  <span
                    className={cn(
                      'mt-1 text-xs',
                      {
                        'font-semibold text-blue-700 dark:text-blue-400': isActive,
                        'text-gray-600 dark:text-gray-400': isCompleted,
                        'text-gray-500 dark:text-gray-500': !isActive && !isCompleted,
                      }
                    )}
                  >
                    {stepLabels[index]}
                  </span>
                )}
              </div>
              {stepNumber < totalSteps && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-1 transition-all duration-300',
                    {
                      'bg-green-500': isCompleted || (isActive && currentStep > 1 && index < currentStep -1), // Completed connector
                      'bg-blue-500': isActive && index === currentStep -1 && currentStep > 1, // Active leading connector
                      'bg-gray-300 dark:bg-gray-600': !isCompleted && !(isActive && index === currentStep -1 && currentStep > 1) , // Incomplete connector
                    }
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default VisualProgressTracker;