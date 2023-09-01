import { setupServer } from "msw/node";
import { handlers } from "./handlers";

const server = setupServer(...handlers);

export const mockServer = () => {
  return [
    beforeAll(() => {
      server.listen({
        onUnhandledRequest: "error",
      });
    }),

    afterEach(() => {
      server.resetHandlers();
    }),

    afterAll(() => {
      server.close();
    }),
  ];
};
