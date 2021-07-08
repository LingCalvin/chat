import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { authApi } from '../../../app/services/auth';
import { setAuthentication } from '../../auth/auth-slice';
import { mergeSettings } from '../../settings/settings.slice';

export default function PersistanceLoader() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const settings = localStorage.getItem('settings');
    if (settings) {
      dispatch(mergeSettings(JSON.parse(settings)));
    }
    dispatch(authApi.endpoints.whoAmI.initiate())
      .then(({ data }) => {
        if (data) {
          dispatch(
            setAuthentication({ id: data.sub, username: data.username }),
          );
        }
      })
      .catch
      // An error is thrown if the user is not authenticated.
      ();
  }, [dispatch]);

  return null;
}
