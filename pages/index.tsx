import dynamic from 'next/dynamic';
import { useAppSelector } from '../app/hooks';
import UnauthenticatedView from '../features/home/components/unauthenticated-view';

const AuthenticatedView = dynamic(
  () => import('../features/home/components/authenticated-view'),
);

export default function Home() {
  const authState = useAppSelector((state) => state.auth);

  if (authState.status === 'authenticated') {
    return <AuthenticatedView userId={authState.id} />;
  }

  return <UnauthenticatedView />;
}
