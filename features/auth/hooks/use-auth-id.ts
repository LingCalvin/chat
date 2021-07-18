import { useAppSelector } from '../../../app/hooks';

export default function useAuthId() {
  return useAppSelector((state) =>
    state.auth.status === 'authenticated' ? state.auth.id : undefined,
  );
}
