import '@testing-library/jest-dom';
import { server } from './mocks/server';
global.fetch = require('node-fetch');

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
