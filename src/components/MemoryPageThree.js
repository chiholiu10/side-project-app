import React from 'react';
import { connect } from 'react-redux';

const DifferencePageTwo = ({introType, currentCardType}) => {
    console.log('pageThree')
    return (
        <div>MemoryPageThree</div>
    )
}

const mapStateToProps = state => {
    return {
        introType: state.app.intro.type || [],
        currentCardType: state.app.currentCardType || []
    }
}

export default connect(mapStateToProps, null)(DifferencePageTwo);
