import styles from '../styles/Home.module.css';
import Link from "next/link";

const Card2Page = (props) => {
    return (
        <div className={styles.card2RoutePage}>
            <div className={styles.cardCell}>
                <p data-testid="cardUrlTitle">
                {props.record_url_title}<br/>
                <span
                    style={{
                        fontStyle: "italic",
                        fontFamily: "Comic Sans MS",
                        lineHeight: "1.6rem"}}
                    data-testid="cardRemark"
                >
                    {props.record_remark}
                </span>
                </p>
            </div>

            <div
                data-testid="cardText"
                className={styles.cardCell}
            >
                <p>
                    {props.record_text}
                </p>
            </div>

            <Link href={`.${props.prefix_record_url}${props.record_url}`}  legacyBehavior>
                <a  className={styles.cardForPageTry} data-testid={props.cardid}>
                    <h6 >Try it!</h6>
                </a>
            </Link>
        </div>
    )
}
export default Card2Page;