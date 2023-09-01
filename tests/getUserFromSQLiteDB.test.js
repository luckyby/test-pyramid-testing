// import { fetch } from 'node-fetch'
// import { render } from '@testing-library/jest-dom'
// const {Response} = jest.requireActual('node-fetch');
import next from "next"; //to be able to use fetch
// import {fetch} from "msw";
// import {response, rest} from "msw";

describe("Test batabase users should read", () => {




  test("by ID=3", async () => {
    const url = new URL("http://localhost:3010/api/users/id/3")
    const res = await fetch(url);
    // console.log('res', res)
    const responseJson = await res.json();
    // console.log('responseJson:', responseJson)
    expect(responseJson).toEqual({
      id: "3",
      firstname: "James",
      lastname: "Bond",
      role: "agent 007",
    });
  });

  // test("by ID=30", async () => {
  //   const url = new URL("http://localhost:3010/api/users/id/30");
  //   const res = await fetch(url);
  //   const responseJson = await res.json();
  //   console.log("responseJson:", responseJson);
  //   expect(responseJson).toEqual({
  //     id: "30",
  //     firstname: "Three",
  //     lastname: "Thirty",
  //     role: "Someone useful",
  //   });
  // });
  // test("by mock http://http://localhost:3000/api/weather", async () => {
  //   const url = new URL( `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=9a5e27f1f8c27cc4583860c037dca731`);
  //
  //   const res = await fetch(url);
  //   const responseJson = await res.json();
  //   // console.log("responseJson:", responseJson);
  //   const result = {
  //     city: responseJson.name,
  //     description: responseJson.weather[0].description,
  //     temperature: parseInt(responseJson.main.temp - 273),
  //     degree: "Celsius",
  //   };
  //
  //   // expect(result).toEqual({"city":"Kyiv","description":"light rain","temperature":15,"degree":"Celsius"})
  //   expect(result).toEqual({
  //     city: "Kyiv",
  //     description: "light rain",
  //     temperature: 15,
  //     degree: "Celsius",
  //   });
  // });
  // test('by first name', async ()=>{{"city":"Kyiv","description":"overc
  //     const res= await fetch('http://localhost:3000/api/users/firstname/John')
  //     const responseJson = await res.json();
  //     // console.log('responseJson:', responseJson)
  //     expect(responseJson).toEqual({"id":"8","firstname":"John","lastname":"Doe","role":"Software Applications Architect"})
  // })
  // test('by last name', async ()=>{
  //     const res= await fetch('http://localhost:3000/api/users/lastname/Pan')
  //     const responseJson = await res.json();
  //     // console.log('responseJson:', responseJson)
  //     expect(responseJson).toEqual({"id":"1","firstname":"Peter","lastname":"Pan","role":"Database Developer"})
  // })
});

// const result = {"id":"3","firstname":"Quinto","lastname":"Edwards","role":"Lead Team Planner"};
// expect(result).tob({"id":"3","firstname":"Quinto","lastname":"Edwards","role":"Lead Team Planner"})
// expect(5).toStrictEqual(5)
