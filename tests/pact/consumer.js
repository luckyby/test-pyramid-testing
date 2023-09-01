const fetch = require('node-fetch')

module.exports = {
    fetchOrders: async ()=> {
       const res = await fetch('http://localhost:4003/api/person');
       const json = await res.json()
        console.log('json', json)
       return json
    }
}