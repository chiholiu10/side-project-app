import React from 'react';
import { connect } from 'react-redux';
import { getRandomIndex } from '../actions/app';
import { store } from '../index.js';
 
const DifferencePageTwo = ({ newCard, page, memoryCards }) => {
    
    if (page === "GameTwoPageOne") {
        const randomIndex = Math.floor(Math.random() * memoryCards.length);
        store.dispatch(getRandomIndex(randomIndex));
    }

    return (
        <div>
            <div>{newCard.name}</div>
            <div>{newCard.type}</div>
            <div>{newCard.maxSpeed}</div>
            <div>{newCard.maxPassenger}</div>
            <img src={newCard.imageUrl}/>
            <div>Level {newCard.level}</div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        newCard: state.app.intro || [],
        page: state.app.page || [],
        memoryCards: state.app.memoryCards || [],
    }
}

export default connect(mapStateToProps, null)(DifferencePageTwo);