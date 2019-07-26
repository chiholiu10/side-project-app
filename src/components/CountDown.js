import React, { useEffect, useState, useRef } from 'react';

const CountDown = () => {
    const timeRef = useRef(null);
    const [ seconds, setSeconds ] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => setSeconds(seconds => seconds - 1), 1000);
        timeRef.current = timer;
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if(seconds === 0) clearInterval(timeRef.current);
    }, [seconds]);

    const percentage = Math.floor(100 / 60 * seconds);
    
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

export default CountDown;