import {Action} from "./actions";

export interface CardState {
    id: number,
    title: string,
    text: string
}

export interface NotesState {
    id: number,
    idCard: number,
    note: string
}

export interface BoardState {
    cards: CardState[]|any[],
    notes: NotesState[]|any[],
    title: string,
    text: string,
    note: string,
    move: string
}

const initialState:BoardState = {
    cards: [],
    notes: [],
    title: "",
    text: "",
    note: "",
    move: ""
}

export const boardReducer = (state = initialState, action: Action) => {
    switch(action.type){
        case "ADD_CARD": {
            let createError = false;
            let newCard = {
                id: action.payload.get('id'),
                title: action.payload.get('title'),
                text: action.payload.get('text')
            }
            for (const c of state.cards) {
                if(newCard.title === c.title) {
                    createError = true;
                    alert("This title is already exist");
                }
            }
            if(!createError) {
                return {...state, cards: [...state.cards, newCard]};
            }
            return state;
        }
        case "SET_FIELDS": {
            return {...state, [action.payload.name]: action.payload.value };
        }
        case "DELETE_CARD": {
            let newCards = state.cards.filter((c: CardState) => c.id !== action.payload);
            let newNotes = state.notes.filter((n: NotesState) => n.idCard !== action.payload);
            return {...state, cards: newCards, notes: newNotes};
        }
        case "UPDATE_CARD": {
            let updatedCards = [];
            for (const c of state.cards) {
                updatedCards.push((c.id == action.payload.id) ? action.payload : c);
            }
            return {...state, cards: updatedCards};
        }
        case "ADD_NOTE": {
            let newNote = {
                id: action.payload.get('id'),
                idCard: action.payload.get('idCard'),
                note: action.payload.get('note')
            }
            return {...state, notes: [...state.notes, newNote]}
        }
        case "DELETE_NOTE": {
            let newNotes = state.notes.filter((c: NotesState) => c.id !== action.payload);
            return {...state, notes: newNotes};
        }
        case "UPDATE_NOTE": {
            let updatedNotes = [];
            for (const n of state.notes) {
                updatedNotes.push((n.id == action.payload.id) ? action.payload : n);
            }
            return {...state, notes: updatedNotes};
        }
        case "MOVE_NOTE": {
            let titleError = true;
            let movedNotes = [];
            for (const c of state.cards) {
                    if(action.payload.title === c.title) {
                        titleError = false;
                        for (const n of state.notes) {
                            console.log(action.payload.note.id)
                            if(action.payload.note.id === n.id) {
                                let newNote = {id: n.id, idCard: c.id, note: n.note};
                                movedNotes.push(newNote);
                            } else {
                                movedNotes.push(n);
                            }
                        }
                        console.log(movedNotes);
                }
            }
            if(titleError) {
                alert("You  wrote a wrong input!");
            }
            console.log(movedNotes);
            return {...state, notes: movedNotes};
        }
        default:
            return state
    }
}
