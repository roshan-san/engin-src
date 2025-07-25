import { useContext } from 'react';
import { OnboardContext } from './OnboardContext';

export const useOnboard = () => {
  const context = useContext(OnboardContext);
  if (!context) {
    throw new Error('useOnboard must be used within an OnboardProvider');
  }
  return context;
}; 