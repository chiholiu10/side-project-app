import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import CountDown from './CountDown';
import { memoryCardCheck, calculation, checkMatchCard, checkResult, disableCards } from '../actions/app';

const MemoryPageTwo = ({ chosenImage, memoryCardCheck, calculation, checkMatchCard, checkResult, disabledAllCards }) => {
    const checkCard = (currentCardType, index) => {
        setTimeout(() => 
            checkMatchCard(currentCardType[index].type, index), 1000);   
    }

    const boolean = useRef(null);
    const [ isCurrentBoolean, setBoolean ] = useState(false);

    useEffect(() => {
        if(isCurrentBoolean) {
            setTimeout(() => 
                disableCards(), 1000);
        }
    }, [isCurrentBoolean]);
    
    useEffect(() => {
        const storedBoolean = disabledAllCards ;
      
        boolean.current = storedBoolean;
        return () => storedBoolean
    }, []);

    useEffect(() => {
        setBoolean(boolean.current !== disabledAllCards);
    },[boolean.current, disabledAllCards]);

    let memoryCardsOutput = chosenImage.map((card, index, currentCardType) => {  
        return (
            <div key={ index }>
                <img 
                    className={ card.flipped ? 'memory-card flipped' : 'memory-card unflipped' }  
                    alt={ card.name } 
                    src={ card.imageUrl }
                    disabled={ card.disabled }
                    onClick={() => { 
                        memoryCardCheck(index); 
                        calculation(); 
                        checkCard(currentCardType, index);
                        checkResult(chosenImage, card.type);
                    }}
                />
            </div>
        )   
    });

    return (
        <div>
            MemoryPageTwo
            <CountDown/>
            { memoryCardsOutput }
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    memoryCardCheck: index => dispatch(memoryCardCheck(index)),
    calculation: () => dispatch(calculation()),
    checkMatchCard: (currentCardType, index) => dispatch(checkMatchCard(currentCardType, index)),
    checkResult: (chosenImage, cardType) => dispatch(checkResult(chosenImage, cardType)),
    disableCards: () => dispatch(disableCards())
});

const mapStateToProps = state => {
    return { 
        chosenImage: state.app.memoryCards || [],
        currentCardType: state.app.currentCardType || [],
        disabledAllCards: state.app.disableCards || false
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoryPageTwo);