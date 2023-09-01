const {Pact, Matchers} = require("@pact-foundation/pact");
const assert = require("assert");
const {eachLike} = Matchers
const { fetchOrders } = require('./consumer')
const fetch = require("node-fetch");
const path = require('path');


describe('Pact with db server API', function () {
    const provider = new Pact({
        port: 4003,
        consumer: "practical_test_pyramid_server",
        provider: "sqlite_db_server_api",
        log: path.resolve(process.cwd(), 'logs', 'pact.log'),
        dir: path.resolve(process.cwd(), 'pacts'),
        // logLevel: 'DEBUG',
        logLevel: 'INFO',
        spec: 2,
        pactfileWriteMode: "update",
        host: "127.0.0.1",
    })

    beforeAll(async ()=>{
        await provider.setup()
    })

    beforeEach( async ()=>{
        return await provider.addInteraction({
            state: 'there are orders',
            uponReceiving: 'a request for orders',
            withRequest: {
                path: '/api/person/id/1',
                method: "GET",

            },
            willRespondWith: {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: eachLike({
                body: [{
                    id: '1',
                    firstname: 'John',
                    lastname: 'Doe',
                    role: 'unknown man'
                // }),
                }],
            }
        })
    })

    afterEach(() => provider.verify());

    afterAll(  async ()=>{
        await provider.finalize()
    })

    describe('when a call to the API is made', ()=>{
        it('will receive  user by id=1 ', async function () {
            const res = await fetch('http://localhost:4003/api/person/id/1');
            const json = await res.json()
            assert.ok(json.length)
            // assert.equal(json.length, 1)
        });
    })

});