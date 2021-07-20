import { Config } from '@jest/types';
import { defaults } from 'jest-config';

const config: Config.InitialOptions = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [...defaults.coveragePathIgnorePatterns, 'mocks'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
};

export default config;
