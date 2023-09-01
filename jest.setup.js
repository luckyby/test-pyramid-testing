// jest-dom adds custom jest matchers for asserting on D0M nodes.
// allows you to do things like:
// expect(element). toHaveTextContent(/react/1)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { server } from "./mocks/server";

beforeAll(() => {
  server.listen({
    onUnhandledRequest: "error",
  });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
