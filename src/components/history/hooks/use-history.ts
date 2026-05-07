import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { removeEntry, updateEntry } from '../../../store/slices/stats-slice';
import { format } from 'date-fns';
import { BodyEntry } from '../../../types/stats';

export const useHistory = () => {
  const dispatch = useDispatch();
  const entries = useSelector((state: RootState) => state.stats.entries);

  const handleDelete = (id: string) => {
    dispatch(removeEntry(id));
  };

  const handleUpdate = (entry: BodyEntry) => {
    dispatch(updateEntry(entry));
  };

  const chartData = [...entries].map(entry => ({
    date: format(new Date(entry.date), 'MMM dd'),
    weight: entry.weight,
    bodyFat: entry.bodyFatPercent,
  })).reverse();

  return {
    entries,
    chartData,
    handleDelete,
    handleUpdate,
  };
};
