export const types = {
    NEXT_CLICK: 'NEXT_CLICK',
    CARD_CHECK: 'CARD_CHECK',
    MATH_RANDOM: 'MATH_RANDOM',
    TOGGLE_SOUND: 'TOGGLE_SOUND',
    CALCULATION: 'CALCULATION',
    CHECK_MATCHED_CARD: 'CHECK_MATCHED_CARD',
    CHECK_RESULT: 'CHECK_RESULT'
}

export const nextClick = pageTitle => {
    return {
        type: types.NEXT_CLICK,
        pageTitle
    }
}

export const memoryCardCheck = index => ({
    type: types.CARD_CHECK,
    index,
    disabled: true
});

export const getRandomIndex = randomIndex => {
    return {
        type: types.MATH_RANDOM,
        randomIndex
    }
};

export const toggleSound = () => ({
    type: types.TOGGLE_SOUND
});

export const calculation = () => ({
    type: types.CALCULATION
});

export const checkMatchCard = (currentCardType, index) => ({
    type: types.CHECK_MATCHED_CARD,
    currentCardType,
    index
});

export const checkResult = (chosenImage, index) => ({
    type: types.CHECK_RESULT,
    chosenImage,
    index
})