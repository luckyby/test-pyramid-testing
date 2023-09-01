import {render} from "@testing-library/react";
import "@testing-library/jest-dom";
import {screen} from "@testing-library/dom"
import Card2API from '../components/Card2API'

describe('Rendered component Card2API', ()=>{
    describe(' has given ', ()=>{
        beforeEach(()=>{
            render(<Card2API
                cardid="card4"
                path = "/api/users/id/[id]"
                id = "1"
                record_method = "GET"
                record_remark = ""
                record_text='return json object with data of one user selected by id'
                cardReqUrl="http://localhost:3010/api/users/id/1"
                cardReqMethod="GET"
                cardReqHeaders=""
                cardReqBody=""
                cardReqRedirect="follow"
            /> )
        })
        test("href in link", async ()=>{
            //Act
            const cardUrl = screen.getByRole('link')

            //Assert
            expect(cardUrl).toHaveAttribute('href', '/api/users/id/1');
        })
        test("url title", async ()=>{
            // Act
            const cardTitle = screen.getByTestId('cardUrlTitle')
            // const cardRemark = screen.getByText('')
            // const cardtext = screen.getByText('page "National Bank of Ukraine current exchange rate USD to UAH"')

            //Assert
            expect(cardTitle).toHaveTextContent('http://localhost:3010/api/users/id/[id]')
        })
        test("remark", async ()=>{
            //Arrange beforeEach

            // Act
            const cardRemark = screen.getByTestId('cardRemark')

            //Assert
            expect(cardRemark).toHaveTextContent('')
        })
        test("text", async ()=>{
            //Arrange beforeEach

            // Act
            const cardRemark = screen.getByTestId('cardText')

            //Assert
            expect(cardRemark).toHaveTextContent('return json object with data of one user selected by id')
        })
    })
    describe(" link button ",()=>{
        it("exists", async ()=>{

            //Arrange
            render(<Card2API
                            cardid="card4"
                            path = "/api/users/id/[id]"
                            id = "1"
                            record_method = "GET"
                            record_remark = ""
                            record_text='return json object with data of one user selected by id'
                            cardReqUrl="http://localhost:3010/api/users/id/1"
                            cardReqMethod="GET"
                            cardReqHeaders=""
                            cardReqBody=""
                            cardReqRedirect="follow"
            /> )

            //Act
            // const link = screen.getByTestId('card4')

            //Assert
            expect(screen.getByRole('link')).toHaveAttribute('href', '/api/users/id/1');

            // screen.debug()
        })
    })

})



