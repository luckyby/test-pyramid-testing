import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../pages";
import Header from "../components/Header";
import Footer from "../components/Footer";

describe ("server did render main page where", ()=>{
    it("all component Cards are exist", ()=>{
        render(<Home />);
        // const testvar = screen.AllByText
        const allCards = screen.getAllByTestId("cardRemark");
        expect(allCards.length).toBe(9);
    });
    it("component Header is rendered", ()=>{
        render(<Header tag_1='h3' main_title_1='Welcome to server for testing' tag_2='h2' main_title_2=''/>);
        expect(screen.getByTestId("componentHeader")).toBeInTheDocument();
        expect(screen.getByTestId("headerTag1")).toBeInTheDocument();
        expect(screen.getByTestId("headerTag2")).toBeInTheDocument();
    });
    it("component Footer is rendered", ()=>{
        render(<Footer />);
        expect(screen.getByTestId("mainFooter")).toBeInTheDocument();
        expect(screen.getByTestId("footerH5")).toBeInTheDocument();
    });
    it("divs routesApi and recordBlockApi are rendered", ()=>{
        render(<Home />);
        expect(screen.getByTestId("recordBlockApi")).toBeInTheDocument();
        expect(screen.getByTestId("routesApi")).toBeInTheDocument();
    });
    it("div routesPages is rendered", ()=>{
        render(<Home />);
        expect(screen.getByTestId("recordBlockPages")).toBeInTheDocument();
        expect(screen.getByTestId("routesPages")).toBeInTheDocument();
    });
    it("div routesBlock is rendered", ()=>{
        render(<Home />);
        expect(screen.getByTestId("routesBlock")).toBeInTheDocument();
    });
    it("main div is rendered", ()=>{
        render(<Home />);
        expect(screen.getByTestId("pagetitle")).toBeInTheDocument();
        expect(screen.getByTestId("main")).toBeInTheDocument();
        expect(screen.getByTestId("mainWrapper")).toBeInTheDocument();
    });
});
