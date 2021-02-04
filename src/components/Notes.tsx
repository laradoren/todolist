import React, {useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            backgroundColor: "#B02554"
        }
    }),
);

export const Footer = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static">
                <Toolbar className={classes.root}>
                    Alina Dasha
                </Toolbar>
            </AppBar>
        </div>
    );
}
