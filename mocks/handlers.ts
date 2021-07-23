import { DefaultRequestBody, rest } from 'msw';
import { paths } from '../common/interfaces/api-schemas';

function generateBackendPath(endpoint: string) {
  return `/api${endpoint}`;
}

const signInPath = '/auth/sign-in';
type SignInRequest = paths[typeof signInPath]['post'];
type SignInRequestBody =
  SignInRequest['requestBody']['content']['application/json'];
type SignInResponseBody =
  SignInRequest['responses']['200']['content']['application/json'];
const signInHandler = rest.post<SignInRequestBody, SignInResponseBody>(
  generateBackendPath(signInPath),
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.cookie('accessToken', JSON.stringify('accessToken')),
      ctx.json({
        id: '00000000-0000-0000-0000-000000000000',
        username: 'test-account',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    );
  },
);

const signUpPath = '/auth/sign-up';
type SignUpRequest = paths[typeof signUpPath]['post'];
type SignUpRequestBody =
  SignUpRequest['requestBody']['content']['application/json'];
type SignUpResponseBody =
  SignUpRequest['responses']['201']['content']['application/json'];
const signUpHandler = rest.post<SignUpRequestBody, SignUpResponseBody>(
  generateBackendPath(signUpPath),
  (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: '00000000-0000-0000-0000-000000000000',
        username: req.body.username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    );
  },
);

const deleteAccountPath = '/auth/delete-account';
type DeleteAccountRequest = paths[typeof deleteAccountPath]['post'];
type DeleteAccountRequestBody =
  DeleteAccountRequest['requestBody']['content']['application/json'];
const deleteAccountHandler = rest.post<DeleteAccountRequestBody>(
  generateBackendPath(deleteAccountPath),
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  },
);

const createTicketPath = '/auth/tickets';
const createTicketHandler = rest.post<
  DefaultRequestBody,
  paths['/auth/tickets']['post']['responses']['201']['content']['application/json']
>(generateBackendPath(createTicketPath), (req, res, ctx) => {
  if (req.cookies['accessToken'] !== 'accessToken') {
    return res(ctx.status(401));
  }
  return res(
    ctx.status(201),
    ctx.json({ ticket: '00000000-0000-0000-0000-000000000000' }),
  );
});

export const handlers = [
  signInHandler,
  signUpHandler,
  deleteAccountHandler,
  createTicketHandler,
];
