import React, { useRef, useEffect } from 'react';
import './index.css';
import { Grid } from '@material-ui/core';
import Details from './components/Details/Details';
import Main from './components/Main/Main';
import { PushToTalkButton, ErrorPanel } from '@speechly/react-ui';
import { SpeechState, useSpeechContext } from '@speechly/react-client';
import useStyles from './style';
import { useStateContext } from './context/context';
const App = () => {
    const classes = useStyles();
    const { speechState } = useSpeechContext();
    const main = useRef(null)
    const {setYellowBar} = useStateContext();
    const executeScroll = () => main.current.scrollIntoView()
    
    useEffect(() => {
        if (speechState === SpeechState.Recording) {
            executeScroll();
            setYellowBar(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [speechState]);

    return (
        <div>
            <Grid className={classes.grid} container spacing={0} alignItems="center" justifyContent='center' style={{ height: '100vh' }}>
                <Grid item xs={12} sm={4} className={classes.mobile}>
                    <Details title="Income" />
                </Grid>
                <Grid item ref={main} xs={12} sm={3} className={classes.main}>
                    <Main />
                </Grid>
                <Grid item xs={12} sm={4} className={classes.desktop}>
                    <Details title="Income" />
                </Grid>
                <Grid item xs={12} sm={4} className={classes.last}>
                    <Details title="Expense" />
                </Grid>
            </Grid>
            <div className='mic-btn'>
                <PushToTalkButton />
                <ErrorPanel />
            </div>
        </div>
    )
}

export default App
