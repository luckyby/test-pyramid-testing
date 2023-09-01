const {Verifier} = require("@pact-foundation/pact");
// const path = require("path");

const pactBrokerUrl = process.env.PACT_BROKER_URL;
const providerBaseUrl = process.env.PROVIDER_BASE_URL || 'http://localhost:4003/';
const pactBrokerToken = process.env.PACT_BROKER_TOKEN_R;

// return new Verifier({
//     pactBrokerUrl: '<HOST>', // host of pact broker (pactflow)
//     pactBrokerToken: '<TOKEN>', // authorization token for pact broker
//     providerBaseUrl: `http://localhost:3000`, // provider's host
//     provider: 'example-server', // provider's name
//     providerVersion: '1.0.0', // provider's version
//     consumerVersionSelectors: [ // matcher to find the right contract on pact broker
//         {
//             consumer: 'example-client',
//             tag: '1.0.0',
//         }
//     ],
//     publishVerificationResult: true, // results of verivfication will be published in the end of process
// }).verifyProvider();

const options = {
    provider: 'sqlite_db_server_api',
    // pactUrls: [],
    providerBaseUrl,
    pactBrokerUrl,
    pactBrokerToken,
    providerVersion: '1.0.0',
    publishVerificationResult: true,
    consumerVersionSelectors: [ // matcher to find the right contract on pact broker
        {
            consumer: 'practical_test_pyramid_server',
            tag: '1.0.0',
        }
    ],
};


describe('Pact test for server', () => {
    describe('handleUser', () => {
        it('should get the right user data', () => {
            // return new Verifier({
            //     providerBaseUrl: `http://localhost:4003`,
            //     // pactUrls: [`${process.cwd()}/pacts/example-client-example-server.json`],
            //     pactUrls: ['/Users/sergars/js_projects/next/practical-test-pyramid-server/pacts/practical_test_pyramid_server-sqlite_db_server_api.json']
            // }).verifyProvider();
            return new Verifier(options).verifyProvider()

        })
    });
});