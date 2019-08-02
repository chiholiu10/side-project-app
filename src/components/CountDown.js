import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

const CountDown = ({curLevel}) => {
    const newTimer = curLevel * 15;
    const timeRef = useRef(null);
    const level = useRef(null);
    const [ seconds, setSeconds ] = useState(newTimer);
    const [ isCurrentLevel , setLevel ] = useState(false);

    // countdown
    useEffect(() => {
        const timer = setInterval(() => setSeconds(seconds => seconds - 1), 1000);
        timeRef.current = timer;
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if( seconds === 0 || isCurrentLevel ) clearInterval(timeRef.current);

    }, [seconds, isCurrentLevel]);

    // level comparison
    useEffect(() => {
        const storedLevel = curLevel;
      
        level.current = storedLevel;
        return () => storedLevel
    }, []);

    useEffect(() => {
        setLevel(level.current !== curLevel);
    },[level.current, curLevel]);

    const percentage = Math.floor(100 / newTimer * seconds);
    
    const divStyle = {
        width:  `${percentage}%`,
        top: 0,
        bottom: 0,
        backgroundColor: 'white',
        transition: 'all 2s ease-out',
        position: 'absolute',
        zIndex: 1
    }

    const countDownNumber = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        color: 'red',
        zIndex: 2
    }

    const borderLine = {
        border: '2px solid black',
        position: 'relative',
        width: '100%',
        height: '50px',
        backgroundColor: 'black'
    }

    return (
        <div style={ borderLine }>
            <div style={ countDownNumber }>{ seconds }</div>
            <div style={ divStyle }></div>
        </div>
    )
}



const mapStateToProps = state => {
    return {
        curLevel: state.app.currentLevel
    }
}

export default connect(mapStateToProps, null)(CountDown);