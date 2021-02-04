import React, {useState} from 'react';
import './App.css';
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {Board} from "./components/Board";
import {useSelector} from "react-redux";
import {BoardState} from "./redux/boardReducer";

const App = () => {
    const [darkTheme, setDarkTheme] = useState(false);
    const [openModalAddNewCard, setOpenModalAddNewCard] = React.useState(false);
    const state = useSelector<BoardState, BoardState>(
        (state) => state
    );

    const handleOpenModal = () => {
        setOpenModalAddNewCard(true);
    };

    const handleCloseModal = () => {
        setOpenModalAddNewCard(false);
    };
    return (
        <div>
          <Header darkTheme = {darkTheme} setDarkTheme={setDarkTheme} handleOpenModal={handleOpenModal} />
          <Board darkTheme = {darkTheme} state = {state} openModal={openModalAddNewCard} handleCloseModal={handleCloseModal} />
          <Footer />
        </div>
  );
}

export default App;
