const {Verifier} = require("@pact-foundation/pact");
// const path = require("path");

describe('Pact test for server', () => {
    describe('handleUser', () => {
        it('should get the right user data', () => {



            return new Verifier({
                providerBaseUrl: `http://localhost:4003`,
                // pactUrls: [`${process.cwd()}/pacts/example-client-example-server.json`],
                pactUrls: ['/Users/sergars/js_projects/next/practical-test-pyramid-server/pacts/practical_test_pyramid_server-sqlite_db_server_api.json']
            }).verifyProvider();
        })
    });
});