import React, { FC} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {ToDoCard} from "../Card";
import {ModalWindow} from "../ModalWindow";
import {useDispatch} from "react-redux";
import {addNewCard, setFields, deleteCard, updateCard} from "../../redux/boardReducer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: " 30px 50px",
            minHeight: "calc(100vh - 209px)",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridGap: "50px"
        },
        darkColor: {
            backgroundColor: "#181717",
            padding: " 30px 50px",
            minHeight: "calc(100vh - 209px)",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridGap: "50px"
        }

    }),
);

interface BoardProps {
    darkTheme: boolean,
    openModal: boolean,
    handleCloseModal: any,
    cards: any,
    title: string,
    text: string
}

export const Board:FC<BoardProps> = ({darkTheme, cards, title, text, openModal, handleCloseModal}) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const onChange = (e: any) => {
        const {name, value} = e.target;
        dispatch(setFields({name, value}));
    };

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData;
        let id = cards.length + 1;
        formData.append('id', id);
        formData.append('title', title);
        formData.append('text', text);

        dispatch(addNewCard(formData));
        dispatch(setFields({name: "title", value: ""}));
        dispatch(setFields({name: "text", value: ""}));
        handleCloseModal();
    }

    const onClickDelete = (id:number) => {
        dispatch(deleteCard(id));
    }

    return (
        <div className={(darkTheme) ? classes.darkColor : classes.container}>
            {cards.map((c:any) => <ToDoCard
                                    key={c} id={c.id}
                                    titleCard={c.title} textCard={c.text}
                                    title={title} text={text}
                                    deleteCard = {onClickDelete}
                                    onFieldChange={onChange}/>)}
            <ModalWindow openModal={openModal} handleCloseModal={handleCloseModal} onFieldChange={onChange} onFormSubmit={onFormSubmit} />
        </div>
    );
}
