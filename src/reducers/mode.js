const SET_FULL_SCREEN = 'scratch-gui/mode/SET_FULL_SCREEN';
const SET_PLAYER = 'scratch-gui/mode/SET_PLAYER';
const TOGGLE_ANALYSER = 'scratch-gui/mode/TOGGLE_ANALYSER';
const TOGGLE_SERIAL_MONITOR = 'scratch-gui/mode/TOGGLE_SERIAL_MONITOR';

const initialState = {
    showBranding: false,
    isFullScreen: false,
    isPlayerOnly: false,
    analyserVisible: false,
    serialMonitorVisible: false,
    hasEverEnteredEditor: true
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_FULL_SCREEN:
        return Object.assign({}, state, {
            isFullScreen: action.isFullScreen
        });
    case SET_PLAYER:
        return Object.assign({}, state, {
            isPlayerOnly: action.isPlayerOnly,
            hasEverEnteredEditor: state.hasEverEnteredEditor || !action.isPlayerOnly
        });
    case TOGGLE_ANALYSER:
        return Object.assign({}, state, {
            analyserVisible: !state.analyserVisible,
            serialMonitorVisible: false
        });
    case TOGGLE_SERIAL_MONITOR:
        return Object.assign({}, state, {
            serialMonitorVisible: !state.serialMonitorVisible,
            analyserVisible: false
        });
    default:
        return state;
    }
};

const setFullScreen = function (isFullScreen) {
    return {
        type: SET_FULL_SCREEN,
        isFullScreen: isFullScreen
    };
};
const setPlayer = function (isPlayerOnly) {
    return {
        type: SET_PLAYER,
        isPlayerOnly: isPlayerOnly
    };
};
const toggleAnalyser = function () {
    return {
        type: TOGGLE_ANALYSER
    };
};
const toggleSerialMonitor = function () {
    return {
        type: TOGGLE_SERIAL_MONITOR
    };
};

export {
    reducer as default,
    initialState as modeInitialState,
    setFullScreen,
    setPlayer,
    toggleAnalyser,
    toggleSerialMonitor
};
