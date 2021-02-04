import React, {FC} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {ModalWindow} from "./ModalWindow";
import {useDispatch} from "react-redux";
import {deleteNote, moveNote, setFields, updateNote} from "../redux/actions";
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import {Button, TextField} from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            border: "#B02554 1px solid",
            backgroundColor: "#C4C4C4",
            marginTop: "20px"
        },
        form : {
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
        },
        buttons : {
            marginTop: "15px"
        }
    }),
);

interface NotesProps {
    id: number,
    idCard: number,
    note: string,
    onFieldChange: (e: any) => void,
    noteTitle: string,
    move: string
}

export const Notes:FC<NotesProps> = ({id, move, idCard, noteTitle, note, onFieldChange}) => {
    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState(false);
    const [openMoveInput, setOpenMoveInput] = React.useState(false);
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(setFields({name: "note", value: noteTitle}));
        setOpenModal(true);
    };

    const onClickUpdate = (e:any) => {
        e.preventDefault()
        dispatch(updateNote({id, idCard, note}));
        setOpenModal(false);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const onClickDeleteNotes = (id:number) => {
        dispatch(deleteNote(id));
    }

    const onClickMoveCards = (e: any) => {
        e.preventDefault()
        dispatch(moveNote({title: move, note: {id, idCard, note}}));
        setOpenMoveInput(false);
    }

    return (
        <>
            <Card className={classes.root}>
                <CardHeader title={noteTitle} />
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" onClick={handleOpenModal}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="share" onClick={() => {onClickDeleteNotes(id)}} >
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="move" onClick={() => {setOpenMoveInput(true)}} >
                        <ControlCameraIcon />
                    </IconButton>
                    {openMoveInput
                        ? <form noValidate autoComplete="off" className={classes.form} onSubmit={onClickMoveCards} >
                            <TextField id="move" name="move" label="Note" onChange={onFieldChange} />
                            <div className={classes.buttons}>
                                <Button type={"submit"} aria-label="save" >
                                    <DoneIcon />
                                </Button>
                            </div>
                        </form>
                        : <></>}
                </CardActions>
            </Card>
            <ModalWindow isNotes={true} openModal={openModal} handleCloseModal={handleCloseModal}
                         onFieldChange={onFieldChange} onFormSubmit={onClickUpdate}  noteValue={note} />
            </>
    );
}

