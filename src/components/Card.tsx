import React, {FC} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {ModalWindow} from "./ModalWindow";
import {useDispatch} from "react-redux";
import {addNewNote, setFields, updateCard} from "../redux/actions";
import {Notes} from "./Notes";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            minHeight: 200,
            padding: "20px 0",
        },
        card: {
            backgroundColor: "#C4C4C4",
            minHeight: 200,
        },
        addButton : {
            backgroundColor: "#B02554"
        }
    }),
);

interface CardProps {
    id: number,
    title: string,
    text: string,
    notes: any[],
    note: string,
    titleCard: string,
    textCard: string,
    deleteCard: (id: number) => void,
    onFieldChange: (e: any) => void,
    move: string
}

export const ToDoCard:FC<CardProps> = ({id, move, title, text, notes, note, titleCard, textCard, deleteCard,  onFieldChange}) => {
    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState(false);
    const [openModalNotes, setOpenModalNotes] = React.useState(false);
    let notesCard = notes.filter((n:any) => (n.idCard == id));
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(setFields({name: "title", value: titleCard}));
        dispatch(setFields({name: "text", value: textCard}));
        setOpenModal(true);
    };

    const onClickUpdate = (e:any) => {
        e.preventDefault()
        dispatch(updateCard({id, title, text}));
        setOpenModal(false);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const onFormSubmitNotes = (e: any) => {
        e.preventDefault();
        const formData = new FormData;
        let idNotes = notes.length + 1;
        formData.append('id', idNotes.toString());
        formData.append('idCard', id.toString());
        formData.append('note', note);
        dispatch(addNewNote(formData));
        dispatch(setFields({name: "note", value: ""}));
        setOpenModalNotes(false);
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardHeader title={titleCard} />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {textCard}
                    </Typography>
                    {notesCard.map((c:any) => <Notes move = {move} key={c} id={c.id} note = {note}
                                                     idCard={id} noteTitle={c.note} onFieldChange={onFieldChange}/>)}
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="edit" onClick={handleOpenModal}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => {deleteCard(id)}} >
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="create" onClick={() => setOpenModalNotes(true)}>
                        <AddIcon />
                    </IconButton>
                </CardActions>
            </Card>
            <ModalWindow isNotes={false} openModal={openModal} handleCloseModal={handleCloseModal}
                         onFieldChange={onFieldChange} onFormSubmit={onClickUpdate}
                         textValue={text} titleValue={title} />
            <ModalWindow isNotes={true} noteValue={note} openModal={openModalNotes}
                         handleCloseModal={() => setOpenModalNotes(false)}
                         onFieldChange={onFieldChange} onFormSubmit={onFormSubmitNotes} />
        </div>
    );
}
