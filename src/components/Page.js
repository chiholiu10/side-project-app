import React from 'react';
import { connect } from 'react-redux';
import Intro from "./Intro";
import MemoryPageOne from "./MemoryPageOne";
import MemoryPageTwo from "./MemoryPageTwo";
import MemoryPageThree from "./MemoryPageThree";
import DifferencePageOne from "./DifferencePageOne";
import DifferencePageTwo from "./DifferencePageTwo";
import Outro from "./Outro";

import { pages } from '../reducers/app';

const Page = ({ page }) => {
    switch(page) {
        case pages.Intro:
            return <Intro />;
        case pages.GameOnePageOne:
            return <DifferencePageOne />;
        case pages.GameOnePageTwo:
            return <DifferencePageTwo />;
        case pages.GameTwoPageOne:
            return <MemoryPageOne />;
        case pages.GameTwoPageTwo:
            return <MemoryPageTwo />;
        case pages.GameTwoPageThree:
            return <MemoryPageThree />;
        case pages.Outro:
            return <Outro />;
        default:
            return <pre>You reached default which was not expected in component/Pages</pre>;
    }
}

const mapStateToProps = state => {
    return {
        page: state.app.page,
    }
}

export default connect(mapStateToProps, null)(Page);
