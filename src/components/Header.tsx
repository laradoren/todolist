import React, {FC} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {FormGroup, FormControlLabel, Switch, Box } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 50px",
            backgroundColor: "#C4C4C4",
            color: "#181717"
        },
        darkHeader: {
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 50px",
            backgroundColor: "#181717",
            borderBottom: "1px solid #fff"
        },
        addButton : {
            backgroundColor: "#B02554"
        }
    }),
);

interface HeaderProps {
    darkTheme: boolean,
    setDarkTheme: (event: boolean) => void,
    handleOpenModal: () => void
}

export const Header:FC<HeaderProps> = ({darkTheme, setDarkTheme, handleOpenModal}) => {
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDarkTheme(event.target.checked);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar className={darkTheme ? classes.darkHeader : classes.root}>
                    <Box>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={darkTheme} onChange={handleChange} aria-label="login switch" />}
                                label={darkTheme ? 'Dark' : 'Light'} color="dark"
                            />
                        </FormGroup>
                    </Box>
                    <Box onClick={handleOpenModal}>
                        <Fab className={classes.addButton} aria-label="add"  >
                            <AddIcon  />
                        </Fab>
                    </Box>
                </Toolbar>
            </AppBar>
    </div>
    );
}
