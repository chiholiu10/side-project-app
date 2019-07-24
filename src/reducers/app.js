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
    currentLevel: 2,
    countAttempts: 0
}; 

const reducer = (state = initialState, action) => {
    const introType = state.intro.type;
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
            
            const result = memoryCardArray.filter(card => {
                const matchCardType = (card.type === introType);
                const newCards = (matchCardType && (card.hasOwnProperty('disabled')));
                const currentCardLeft = matchCardType - newCards;

                return currentCardLeft 
            });

            const attempts = Math.ceil(memoryCardArray.length / 1.5);
            const gameResult = ((state.countAttempts < attempts));
            
            if((result.length === 0)) {
                gameResult ? console.log('win'): console.log('lose');

                const newCardArray = memoryCardArray.map((card) => {
                    return {
                        ...card,
                        flipped: true,
                        disabled: true
                    }
                });

                return {
                    ...state, 
                    memoryCards: newCardArray
                }
            } 

            return {
                ...state,
                countAttempts: state.countAttempts += 1
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
