import next from "next"; //to be able to use fetch
import { mockServer } from "../mocks/mockServer";

if(process.env.MOCKSERVER === '1'){
  mockServer();
}


describe("User's data with ID=3 received by mock server", () => {
  test("is correct", async () => {
    const url = new URL("http://localhost:3010/api/users/id/3");
    const res = await fetch(url);
    // console.log('res', res)
    const responseJson = await res.json();
    // console.log('responseJson:', responseJson)
    expect(responseJson).toEqual({
      id: "3",
      firstname: "Quinto",
      lastname: "Edwards",
      role: "Lead Team Planner",
    });
  });
});

describe('Current exchange data received by mock server', ()=>{
  test("has status code 200", async () => {
    const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`;
    const res = await fetch(url);

    const statusCode = await res.status
    expect(statusCode).toEqual(200)
  });
  test("exchange rate is correct", async () => {
    //
    const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`;
    const res = await fetch(url);
    const json = await res.json();
    const jsonUSD = json["25"]

    //Act
    const rateUSD = jsonUSD.rate


    expect(rateUSD).toEqual(36.5686)

  });
  test("exchange date is correct", async () => {
    const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`;
    const res = await fetch(url);
    const json = await res.json();
    const jsonUSD = json["25"]

    const exchangeDate = jsonUSD.exchangedate

    expect(exchangeDate).toEqual('08.12.2022')
  });
})
