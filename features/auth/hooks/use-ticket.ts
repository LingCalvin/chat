import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useCreateTicketMutation } from '../../../app/services/auth';
import { setTicket } from '../auth-slice';

export default function useTicket() {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.auth.status);
  const ticket = useAppSelector((state) =>
    state.auth.status === 'authenticated' ? state.auth.ticket : undefined,
  );
  const [createTicket] = useCreateTicketMutation();

  // Request a ticket when the client is authenticated but does not have one
  useEffect(() => {
    if (authStatus === 'authenticated' && ticket === undefined) {
      createTicket()
        .unwrap()
        .then(({ ticket }) => {
          dispatch(setTicket(ticket));
        });
    }
  }, [authStatus, createTicket, dispatch, ticket]);

  return ticket;
}
