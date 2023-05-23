import React from "react";
import Title from "../components/Title";
import Header from "../components/Header";
import Content from "../components/Content";
import { Link } from "react-router-dom";

function Home() {
    return (
      <div className="main">
        <Title />
        <Header />
        <Content />
        <br></br><br></br><br></br><br></br>want to add, update, or delete countries? <Link to="/Admin">click here</Link>
      </div>  
    );
}

export default Home;