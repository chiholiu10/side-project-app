import React from 'react';
import { connect } from 'react-redux';
import { memoryCardCheck, calculation, checkMatchCard, checkResult } from '../actions/app';

const MemoryPageTwo = ({ chosenImage, memoryCardCheck, calculation, checkMatchCard, checkResult, level }) => {

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
                    disabled={card.disabled }
                    onClick={() => { 
                        memoryCardCheck(index); 
                        calculation(); 
                        checkCard(currentCardType, index);
                        checkResult(chosenImage);
                    }}
                />
            </div>
        )   
    });

    return (
        <div>
            MemoryPageTwo
            { memoryCardsOutput }
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    memoryCardCheck: index => dispatch(memoryCardCheck(index)),
    calculation: () => dispatch(calculation()),
    checkMatchCard: (currentCardType, index) => dispatch(checkMatchCard(currentCardType, index)),
    checkResult: (chosenImage) => dispatch(checkResult(chosenImage))
});

const mapStateToProps = state => {
    return { 
        chosenImage: state.app.memoryCards || [],
        introType: state.app.intro.type || [],
        currentCardType: state.app.currentCardType || [],
        disabled: []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoryPageTwo);