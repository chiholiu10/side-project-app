import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CountDown from './CountDown';
import { memoryCardCheck, calculation, checkMatchCard, checkResult } from '../actions/app';

const MemoryPageTwo = ({ chosenImage, memoryCardCheck, calculation, checkMatchCard, checkResult }) => {
    
    const checkCard = (currentCardType, index) => {
        setTimeout(() => 
            checkMatchCard(currentCardType[index].type, index), 1000);   
    }

    let memoryCardsOutput = chosenImage.map((card, index, currentCardType) => {  
        return (
            <div key={index}>
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
    checkResult: (chosenImage, cardType) => dispatch(checkResult(chosenImage, cardType))
});

const mapStateToProps = state => {
    return { 
        chosenImage: state.app.memoryCards || [],
        currentCardType: state.app.currentCardType || [],
        resultOfLength: state.app.resultLength || [],
        disabled: []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoryPageTwo);