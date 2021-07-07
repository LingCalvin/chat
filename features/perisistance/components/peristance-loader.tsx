import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { mergeSettings } from '../../settings/settings.slice';

export default function PersistanceLoader() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const settings = localStorage.getItem('settings');
    if (settings) {
      dispatch(mergeSettings(JSON.parse(settings)));
    }
  }, [dispatch]);
  return null;
}
