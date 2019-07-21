import React from 'react';
import { connect } from 'react-redux';
import { nextClick } from '../actions/app';

const Button = ({ nextClick, page}) => {
    return (
        <div onClick={() => nextClick(page)}>
            Button
        </div>
    ) 
}

const mapDispatchToProps = dispatch => ({
    nextClick: page => dispatch(nextClick(page))
});

const mapStateToProps = state => {
    return {
        page: state.app.page,
        memoryCards: state.app.memoryCards
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Button);