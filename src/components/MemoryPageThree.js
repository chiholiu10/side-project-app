import React from 'react';
import { connect } from 'react-redux';

const DifferencePageTwo = () => {
    console.log('pageThree')
    return (
        <div>MemoryPageThree</div>
    )
}

const mapStateToProps = state => {
    return {
        // currentCardType: state.app.currentCardType || []
    }
}

export default connect(mapStateToProps, null)(DifferencePageTwo);
