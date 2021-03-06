import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { components } from '../../common/interfaces/api-schemas';
import { Credentials } from '../../features/auth/interfaces/credentials';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/auth',
  }),
  endpoints: (build) => ({
    createTicket: build.mutation<components['schemas']['TicketResponse'], void>(
      {
        query: () => ({
          url: '/tickets',
          method: 'POST',
        }),
      },
    ),
    signIn: build.mutation<
      components['schemas']['SignInResponse'],
      components['schemas']['CredentialsDto']
    >({
      query: (credentials) => ({
        url: '/sign-in',
        method: 'POST',
        body: credentials,
      }),
    }),
    signUp: build.mutation<
      components['schemas']['SignUpResponse'],
      Credentials
    >({
      query: (credentials) => ({
        url: 'sign-up',
        method: 'POST',
        body: credentials,
      }),
    }),
    whoAmI: build.query<components['schemas']['WhoAmIResponse'], void>({
      query: () => `/who-am-i`,
    }),
  }),
});

export const {
  useCreateTicketMutation,
  useSignInMutation,
  useSignUpMutation,
  useLazyWhoAmIQuery,
} = authApi;
