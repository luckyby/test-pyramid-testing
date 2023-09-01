import styles from "../styles/Home.module.css";
import Link from "next/link";

// import fs from "fs";

function Exchange(props) {

  const rateUSD = props.rateUSD
  const exchangeDate = props.exchangeDate

  return (
    <div className={styles.mainWrapper}>
      <main className={styles.main}>
        <div className={styles.pagetitle}>
          <h3>
            <Link href="https://bank.gov.ua/ua/open-data/api-dev" legacyBehavior>
              <a className={styles.card2PagesLink}>
                National Bank of Ukraine exchange rate
              </a>
            </Link>
            &nbsp;on {exchangeDate}&nbsp;
          </h3>
        </div>
        <div className={styles.routesBlock}>
          <div className={styles.routes}>
            <div className={styles.mainList}>
              <h2>1 USD = {rateUSD} UAH</h2>
            </div>
          </div>
        </div>
        <div className={styles.mainLink}>
          <Link href="/" className={styles.card2PagesLink} legacyBehavior>
            <h4 >
              <a className={styles.card2PagesLink}>
                Go to main page
              </a>
            </h4>
          </Link>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {

  const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`;

  const res = await fetch(url);
  const json = await res.json();
  const jsonLength = json.length
  // console.log('jsonLength = ', jsonLength)
  let rateUSD = 0
  let exchangeDate = "08.12.2022"
  for (let i=0; i<jsonLength; i++){
    const jsonObjectInJsonArray = json[`${i}`]
    if(jsonObjectInJsonArray.r030 === 840){
      rateUSD = jsonObjectInJsonArray.rate
      exchangeDate = jsonObjectInJsonArray.exchangedate
    }
  }
  // const jsonUSD = json["24"]
  // const rateUSD = jsonUSD.rate
  // const exchangeDate = jsonUSD.exchangedate

  // async function readJsonFile(fileName) {
  //   const fsPromises = require('fs').promises;
  //   const data = await fsPromises.readFile(fileName)
  //       .catch((err) => console.error('Failed to read file', err));
  //
  //   return data
  // }
  // let jsonData
  // fs.readFile('./pages/exchange.json', (err, data)=>{
  //   if (err) throw err;
  //   // console.log(data);
  //
  //   jsonData = JSON.parse(data.toString());
  //   // console.log(jsonData);
  // })
  async function getData ( ) {
    const fsPromise = require('fs/promises');
    try {
      const data = await fsPromise.readFile('./pages/exchange.json');
      // console.log('data:', data)
      return JSON.parse(data.toString())
    } catch (err) {
      console.log(err)
    }
  }
  //   const fs = require('fs/promises');
  //   // const fsPromises = require('fs').promises;
  //
  //       .catch((err) => console.error('Failed to read file', err));
  //
  //   return data
  // }
  let jsonData = await getData()
  // console.log('jsonData = ', jsonData)
  //
  return {
    props: {
      "rateUSD": rateUSD,
      "exchangeDate": exchangeDate
    },
  };
}

export default Exchange;
