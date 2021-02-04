import {CardState, NotesState} from "./boardReducer";

export type Action = { type: string; payload: any };
export const addNewCard = (card: FormData): Action=> ({type: "ADD_CARD", payload: card});
export const setFields = ({name, value}: {name: any, value: any}) => ({ type: "SET_FIELDS", payload: {name, value}});
export const deleteCard = (id: number): Action=> ({ type: "DELETE_CARD", payload: id});
export const updateCard = (card: CardState): Action=> ({ type: "UPDATE_CARD", payload: card});
export const addNewNote = (note: FormData): Action=> ({type: "ADD_NOTE", payload: note});
export const deleteNote = (id: number): Action=> ({ type: "DELETE_NOTE", payload: id});
export const updateNote = (note: NotesState): Action=> ({ type: "UPDATE_NOTE", payload: note});
export const moveNote = ({title, note}:{title: string, note: NotesState}): Action=> ({ type: "MOVE_NOTE", payload: {title, note}});
