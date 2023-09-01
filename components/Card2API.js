import styles from '../styles/Home.module.css';
import Link from "next/link";
import {useState} from "react";
import * as url from "url";
// import {tryHandlerNotEvent} from "../lib/handlers";

const Card2API = (props) => {
    // let path
    const id = props.id
    let path = props.path
    // console.log('path = ', path)
    const idExists = path.search(/\[id\]/)
    // console.log('idExists = ', idExists)
    if(idExists !== -1){
        path = path.substring(0, idExists) + `${id}`
        // console.log('path = ', path)
        // path = pathNew
    }

    // path = props.path.search(/\[id\]/) !== -1
    //     ? path = path.substring(0, props.path.search(/\[id\]/)) + `${id}`
    //     : path
    // console.log('path = ', path)


    const [buttonText,setButtonText] = useState('Try it!')
    const [buttonBackColor, setbuttonBackColor] = useState('#b22222')
    let [responseText, setResponseText] = useState([])
    let [resVisible, setResVisible] = useState('none')

    // console.log('Object.keys(url)', Object.keys(url))
    // console.log('url.URL: ', url.URL)
    //
    // console.log('props.base_app_url =', props.app_base_url)

    // console.log('Object.keys(props):', Object.keys(props))
    const record_url_title = `http://localhost:3010${props.path}`
    // console.log('record_url_title =', record_url_title)

    async function reqHandler(url, method, redirect, headers, body, ){

        let myHeaders = new Headers();
        let raw
        let requestOptions = {
            method: method,
            redirect: redirect
        }
        // console.log('props.cardReqHeaders = ',props.cardReqHeaders)
        if(headers===""){
            // console.log('headers === underfined')
        }else{
            for (let key of Object.keys(headers)){
                myHeaders = {...myHeaders, ...{[key]:  headers[`${key}`]}  };
            }
            requestOptions = { ...requestOptions,...{headers: myHeaders } }
        }

        // console.log('myHeaders after append:', JSON.stringify(myHeaders))
        // console.log('requestOptions after append = ', JSON.stringify(requestOptions))

        // for(const pair of myHeaders.entries()){
        //     console.log(`myHeaders: ${pair[0]}: ${pair[1]}`)
        // }


        // console.log('body', body)
        if(body===""){
            console.log('body === ""')
        }else{
            raw = JSON.stringify( body );
            // console.log('raw = ', `${raw}`)
            requestOptions = {...requestOptions, ...{body: raw}}
        }
        // console.log('url in handler = ', url)
        // console.log('requestOptions in reqHandler = ', requestOptions)
        try {
            const fetchRes = await fetch(url, requestOptions)
            // const resText = await fetchRes.text()
            // console.log('resText in try in POST = ', resText)
            const resJson = await fetchRes.json()
            // const resJson = await fetchRes.json()
            // console.log('resJson = ', resJson)
            setResponseText(JSON.stringify(resJson))
        }catch (e) {
            console.log('error:', e)
        }
        // await fetch(url, requestOptions)
        //     .then(response => response.text())
        //     .then(result => {
        //         console.log('result in fetch in reqHandler', result)
        //         console.log('ResponseText = ', responseText)
        //         setResponseText(`${result}`)
        //     })
        //     .catch(error => console.log('error', error));

    }

    const tryHandler = async (e) => {
        e.preventDefault();
        // tryHandlerNotEvent(props, resVisible)
    //
        if(resVisible==='none'){
            setResVisible('grid')
            setButtonText('Close')
            setbuttonBackColor('#71a6c1')
            // setResponseText()
            await reqHandler(
                props.cardReqUrl,
                props.cardReqMethod,
                props.cardReqRedirect,
                props.cardReqHeaders,
                props.cardReqBody
                // {'Content-Type': 'application/json'},
                // {'firstName':'Ben','lastName':'Rogers','role':'captain'}
            )
        }else {
            setResVisible('none')
            setButtonText('Try it!')
            setbuttonBackColor('#b22222')

        }
        // console.log('resVisible', resVisible)
    }

    const methodColor = {
        "POST": "#daf1e7",
        "GET": "#d6e7f5",
        "PUT": "#f6e6d5",
        "DELETE": "#f5d6d8",
    }

    const cardCellColor = methodColor[props.cardReqMethod]

    let reqWithDescribe = `url: "${props.cardReqUrl}";\n` +
        `method: "${props.cardReqMethod}";\n`

    if(props.cardReqHeaders !== ""){
        reqWithDescribe = reqWithDescribe + `headers: ${JSON.stringify(props.cardReqHeaders)};\n`
    }

    if(props.cardReqBody !== ""){
        reqWithDescribe = reqWithDescribe + `body: ${JSON.stringify(props.cardReqBody)}\n`
    }

    reqWithDescribe = reqWithDescribe + `redirect: "${props.cardReqRedirect}";\n`

    return (
        <div className={styles.card2APIWrapper}>
            <div className={styles.card2RouteAPI}>
                <div className={styles.cardCell} style={{backgroundColor: `${cardCellColor}`}}><p>{props.record_method}</p></div>
                <div className={styles.cardCell} style={{backgroundColor: `${cardCellColor}`}}>
                    <p data-testid="cardUrlTitle">
                        {record_url_title}<br/>
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
                    style={{backgroundColor: `${cardCellColor}`}}
                >
                    <p>
                        {props.record_text}
                    </p>
                </div>

                <Link href={`${path}`}  legacyBehavior>
                    <a  onClick={tryHandler} className={styles.cardTry} style={{backgroundColor: `${buttonBackColor}` }} data-testid={props.cardid}>
                        <h6 >{buttonText}</h6>
                    </a>
                </Link>
            </div>
            <div className={styles.card2ReqExample}>
                <div className={styles.cardCell}><p>request with:</p></div>
                <div className={styles.cardCellReqExampleText}><p style={{whiteSpace: "pre-wrap"}}>{reqWithDescribe}</p></div>
            </div>
            <div className={styles.card2ReqExample} style={{display: `${resVisible}`}}>
                <div className={styles.cardCell}><p>response:</p></div>
                <div className={styles.cardCellReqExampleText}><p style={{ wordWrap: "break-word" }}>{responseText}</p></div>
            </div>
        </div>

    )
}
export default Card2API;