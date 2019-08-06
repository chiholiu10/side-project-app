import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRandomIndex } from '../actions/app';
import { store } from '../index.js';
 
const DifferencePageTwo = ({ newCard, page, memoryCards }) => {

    useEffect(() => {
        getIndex()
    }, []);

    const getIndex = () => {
        const randomIndex = Math.round(Math.random() * memoryCards.length);
        store.dispatch(getRandomIndex(randomIndex));
    }

    return (
        
        <div>
            <div>{newCard.name}</div>
            <div>{newCard.type}</div>
            <div>{newCard.maxSpeed}</div>
            <div>{newCard.maxPassenger}</div>
            <img src={newCard.imageUrl}/>
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