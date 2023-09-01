import styles from "../styles/Home.module.css";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className={styles.mainWrapper}>

      <main className={styles.main}>

        <div className={styles.pagetitle}>

          <h2>About this server</h2>
        </div>
        <div className={styles.routesBlock}>
          <div className={styles.routes}>
            <div className={styles.routesTitle}>For What?</div>
            <div className={styles.mainList}>
              {/*<p>This server was created to study the testing principles described by Martin Flower in his article&nbsp;*/}
              {/*  /!*<Link href="https://martinfowler.com/articles/practical-test-pyramid.html" className={styles.card2PagesLink}>*!/*/}
              {/*  <Link href="https://martinfowler.com/articles/practical-test-pyramid.html" className={styles.card2PagesLink} >*/}
              {/*    &quot;The Practical Test Pyramid&quot;*/}
              {/*  </Link>*/}
              {/*</p>*/}
              <p>This server was created to study the testing principles described by Martin Flower in his article&nbsp;
                <Link href="https://martinfowler.com/articles/practical-test-pyramid.html" legacyBehavior>
                  <a className={styles.card2PagesLink}>&quot;The Practical Test Pyramid&quot;</a>

                </Link>
              </p>


            </div>
            <div className={styles.routesTitle}>How it works?</div>
            <div className={styles.mainList}>
              <p>
                For fetch data server calls API of the&nbsp;
                <Link href="http://localhost:4003/" legacyBehavior>
                  <a className={styles.card2PagesLink}>
                    users database server
                  </a>
                </Link>
                &nbsp;and API of&nbsp;
                <Link href="https://bank.gov.ua/ua/open-data/api-dev" legacyBehavior>

                  <a className={styles.card2PagesLink} >
                    National Bank of Ukraine server
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.mainLink}>
          <Link href="/" legacyBehavior>
            <h4>
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

export default AboutPage
