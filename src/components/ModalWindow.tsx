import React, {FC} from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {Modal, Backdrop, Fade, Button, TextField} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        paper: {
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        form : {
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
        },
        buttons : {
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            marginTop: "15px"
        }
    }),
);

interface ModalWindowProps {
    openModal: boolean,
    handleCloseModal: () => void,
    onFieldChange: (e: any) => void,
    onFormSubmit: (e: any) => void,
    titleValue ?: string,
    textValue ?: string,
    noteValue?: string,
    isNotes: boolean
}

export const ModalWindow:FC<ModalWindowProps> = ({isNotes, openModal, handleCloseModal,
                                                     onFieldChange, onFormSubmit, noteValue,
                                                     titleValue, textValue}) => {
    const classes = useStyles();
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal} open={openModal}
            onClose={handleCloseModal} closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500}} >
            <Fade in={openModal}>
                <div className={classes.paper}>
                    <form noValidate autoComplete="off" className={classes.form} onSubmit={onFormSubmit} >
                        {
                            isNotes
                            ? <> <TextField id="note" name="note"
                                            label="Note" onChange={onFieldChange}
                                            required={true} value={noteValue} />
                              </>
                                : <>
                                    <TextField id="title" name="title"
                                               label="Title" onChange={onFieldChange}
                                               required={true} value={titleValue} />
                                    <TextField id="text" label="Text"
                                               multiline rowsMax={4}
                                               onChange={onFieldChange}
                                               name="text" value={textValue}/>
                                        </>
                        }
                        <div className={classes.buttons}>
                            <Button type={"submit"} aria-label="save" >
                                Save
                            </Button>
                            <Button aria-label="close" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </div>
                    </form>
                </div>
            </Fade>
        </Modal>
    );
}
