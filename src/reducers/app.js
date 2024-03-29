import { types } from '../actions/app';
import { CardJson } from '../data/memoryGame';

const MAX_NUM_PLAY = 3;

export const pages = {
    Intro: 'Intro',
    GameOnePageOne: 'GameOnePageOne', // Difference Game
    GameOnePageTwo: 'GameOnePageTwo',
    GameTwoPageOne: 'GameTwoPageOne', // Memory Game
    GameTwoPageTwo: 'GameTwoPageTwo',
    GameTwoPageThree: 'GameTwoPageThree',
    Outro: 'Outro',
};

const initialState = {
    page: pages.Intro,
    numPlayed: 0,
    memoryCards: [],
    intro: [],
    filters: [],
    currentCardType: [],
    flipped: false,
    disabled: false,
    counter: 0,
    soundToggle: false,
    score: 0,
    currentLevel: 1,
    countAttempts: 0,
    disableCards: false,
    cardArrayCheck: [],
    matchCard: []
}; 

export const reducer = (state = initialState, action) => {
    const introType = state.intro;
    const currentCardType = state.currentCardType;
    const memoryCardArray = state.memoryCards;
    switch (action.type) {
        
        case types.NEXT_CLICK: {
            const currentPage = state.page;
            const { page, numPlayed } = handlePageChange(currentPage, state.numPlayed);
            const filter = CardJson.filter(l => l.level === state.currentLevel);
       
            return { 
                ...state,
                numPlayed,
                page,
                memoryCards: filter
            }
        }

        case types.MATH_RANDOM: {
            return {
                ...state,
                intro: memoryCardArray[action.randomIndex]
            }
        }

        case types.CARD_CHECK: {
            let memoryCards = memoryCardArray.map((card, index) => {
                if((index === action.index) && (state.counter === 0)) { 
                   
                    return {
                        ...card,
                        flipped: true,
                        disabled: true
                    } 
                } 
                 
                return card
            });

            let currentCard = memoryCardArray[action.index].type; // since your are checking array index with action.index

            return {
                ...state,
                memoryCards,
                counter: 1,
                currentCardType: currentCard
            }
        }
        
        case types.CHECK_MATCHED_CARD: {
            let memoryCards = memoryCardArray.map((card, index) => {

                if((index === action.index) && (state.intro.type !== action.currentCardType)) {
                    return {
                        ...card,
                        flipped: false
                    }
                }
                
                return card
            });

            return {
                ...state,
                memoryCards,
                counter: 0
            }
        }

        case types.CALCULATION: {
            if(introType === currentCardType) {
                
                return {
                    ...state,
                    score: state.score + 200,
                }
            } else {
                if(state.score <= 0) return { ...state, score: 0 }

                return {
                    ...state,
                    score: state.score - 200
                }
            }
        }

        case types.CHECK_RESULT: {
            console.log('clicked');
            const matchCardType = memoryCardArray.filter(card => card.type === introType.type);
            const newCards =  matchCardType.map(card => {
                return card.hasOwnProperty('disabled') === true
            });

            const flippedCards = newCards.every(x => x === true);

            return {
                ...state,
                matchCard: flippedCards,
                countAttempts: state.countAttempts + 1,
                score: state.matchCard ? state.score + 20 : state.score - 150
            }
        }

        case types.STOP_TIMER: {
            const newCardArray = memoryCardArray.map((card) => {
                return {
                    ...card,
                    flipped: true,
                    disabled: true
                }
            });

            return {
                ...state,
                memoryCards: newCardArray,
                disableCards: true,
                score: state.score - 300
            }
        }

        case types.CHECK_LEVEL: {
            const attempts = Math.ceil(memoryCardArray.length / 1.5);
            const gameResult = (state.countAttempts < attempts);
            const gameCheck = ((state.matchCard === true) || (gameResult === false) || (state.disableCards === true));
            const changeLevel = (state.matchCard === true && gameResult === true) && (state.matchCard === false && state.disableCards === true);

            if(gameCheck) {
                return {
                    ...state, 
                    disableCards: true,
                    currentLevel: changeLevel ? 
                    state.currentLevel < 3 ?state.currentLevel + 1 : state.currentLevel = 3 :
                    state.currentLevel > 1 ? state.currentLevel - 1 : state.currentLevel = 1,
                    score: changeLevel ? state.score + 250 : state.score - 250
                }
            }
        }

        default:
            return state;
    }
}

const handlePageChange = (currentPage, numPlayed) => {
    switch (currentPage) {
        case pages.Intro: {
            const nextPage = Math.random() < 0.5 ? pages.GameOnePageOne : pages.GameTwoPageOne;
            return { page: nextPage, numPlayed }
        }
    
        case pages.GameOnePageOne:
            return { page: pages.GameOnePageTwo, numPlayed }
        case pages.GameTwoPageOne:
            return { page: pages.GameTwoPageTwo, numPlayed }
        case pages.GameTwoPageTwo:
            return { page: pages.GameTwoPageThree, numPlayed }
        case pages.GameOnePageTwo:
        case pages.GameTwoPageThree: {
            let nextPage;
            const newNumPlayed = numPlayed + 1;
            if (newNumPlayed >= MAX_NUM_PLAY) {
                nextPage = pages.Outro;
            } else {
                nextPage = Math.random() < 0.5 ? pages.GameOnePageOne : pages.GameTwoPageOne;
            }
            return { 
                page: nextPage, 
                numPlayed: newNumPlayed 
            }
        }
    
        case pages.Outro:
            return { page: pages.Intro, numPlayed: 0 }
        default:
            console.error('Unexpected reach of default in app reducer');
            return { page: currentPage, numPlayed }
    }
}

export default reducer;