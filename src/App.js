import React from 'react';
import './index.css';
import { Grid } from '@material-ui/core';
import Details from './components/Details/Details';
import useStylea from './style';
import Main from './components/Main/Main';

const App = () => {
    const classes = useStylea();
    return (
        <div>
            <Grid className={classes.grid} container spacing={0} alignItems="center" justifyContent='center' style={{ height: '100vh' }}>
                <Grid item xs={12} sm={4}>
                    <Details title="Income"/>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Main/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Details title="Expense"/>
                </Grid>
            </Grid>
        </div>
    )
}

export default App
