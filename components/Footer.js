import styles from '../styles/Home.module.css'

const Footer = () => {

    return(
        <div className={styles.mainFooter} data-testid="mainFooter">
            <h5 data-testid="footerH5">This server based on <a href='https://nextjs.org/' className={styles.mainLayoutLink}>Next.js</a></h5>
        </div>
    )
}

export default Footer