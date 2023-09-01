import styles from "../styles/Home.module.css";

const Header = (props) => {

        const Tag1 = props.tag_1;
        const Tag2 = props.tag_2;

    return (
        <div className={styles.mainTitle} data-testid="componentHeader">
            {/*<Tag1 data-testid="headerTag1">{props.main_title_1} <a href="http://localhost:3010/" className={styles.mainLayoutLink}>server</a> for study testing</Tag1>*/}
            <Tag1 data-testid="headerTag1">{props.main_title_1} server for study the testing principles of &quot;test pyramid&quot; </Tag1>
            <Tag2 data-testid="headerTag2">{props.main_title_2}</Tag2>
        </div>
    )
}

export default Header
