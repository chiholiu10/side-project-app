import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toggleSound } from '../actions/app';

const useAudio = url => {
    const [ audio ] = useState(new Audio('http://www.kozco.com/tech/piano2.wav'));
    const [ playing, setPlaying ] = useState(false);
  
    const toggle = () => setPlaying(!playing);
  
    useEffect(
      () => { 
        playing ? audio.play() : audio.pause();
      },
      [playing]
    );

    return [playing, toggle];
};

const FooterBar = ({ soundToggle, toggleSound, url, score, level }) => {
    const [playing, toggle] = useAudio(url);
    
    return (
        <div>
            <div>Level { level } </div>
            <div>Score: { score }</div>
            <div>Goal</div>
            <div>
                <button 
                    className={ soundToggle ? 'sound on' : 'sound off' }
                    onClick={ toggleSound(toggle) }
                >{playing ? "Pause": "Play"}</button>
            </div>
        </div>
    )     
}

const mapDispatchToProps = dispatch => {
    return {
        toggleSound(f) {
            return () => {
                dispatch(toggleSound())
                f()
            }
        }
    }
}

const mapStateToProps = state => {
    return {
        soundToggle: state.app.soundToggle || [],
        score: state.app.score || [],
        level: state.app.currentLevel || []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterBar);