import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { updateStats, updateProfile } from '../../../store/slices/user-slice';

export const useProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const updateProfileStats = (newStats: Partial<RootState['user']['stats']>) => {
    dispatch(updateStats(newStats));
  };

  const updateBasicProfile = (newData: Partial<RootState['user']>) => {
    dispatch(updateProfile(newData));
  };

  return {
    user,
    updateProfileStats,
    updateBasicProfile,
  };
};
