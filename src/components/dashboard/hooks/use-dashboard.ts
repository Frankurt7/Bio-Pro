import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export const useDashboard = () => {
  const entries = useSelector((state: RootState) => state.stats.entries);
  const user = useSelector((state: RootState) => state.user);
  
  const latestEntry = entries.length > 0 ? entries[0] : null;
  const previousEntry = entries.length > 1 ? entries[1] : null;

  const weightDiff = latestEntry && previousEntry 
    ? (latestEntry.weight - previousEntry.weight).toFixed(1)
    : '0.0';

  return {
    latestEntry,
    allEntries: entries,
    user,
    weightDiff,
  };
};
