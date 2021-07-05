import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { components } from '../api-schema';
import { Credentials } from '../interfaces/credentials';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/auth',
  }),
  endpoints: (build) => ({
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
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
