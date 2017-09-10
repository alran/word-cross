// Constants
export const PASS_OUT_USER_HAND = 'app/messages/PASS_OUT_USER_HAND';
export const SET_HEIGHT_OF_LETTERS_AREA = 'app/messages/SET_HEIGHT_OF_LETTERS_AREA';
export const ADD_BOARD_DROP_ZONE = 'app/messages/ADD_BOARD_DROP_ZONE';
export const EXCHANGE_FOR_THREE = 'app/messages/EXCHANGE_FOR_THREE';
export const SET_DROP_ZONE_VALUES = 'app/messages/SET_DROP_ZONE_VALUES';

// Actions
export function passOutUserHand() {
  return {
    type: PASS_OUT_USER_HAND,
  };
}

export function setHeightOfLettersArea(height) {
  return {
    type: SET_HEIGHT_OF_LETTERS_AREA,
    height,
  };
}

export function addBoardDropZone(zone, loading) {
  return {
    type: ADD_BOARD_DROP_ZONE,
    loading,
    zone,
  }
}

export function exchangeForThree(letter) {
  return {
    type: EXCHANGE_FOR_THREE,
    letter,
  }
}

export function setDropZoneValues(dropZoneValues) {
  return {
    type: SET_DROP_ZONE_VALUES,
    dropZoneValues,
  }
}

// Reducers
const $$initialState = ({
  availablePieces: [
    "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "B", "B",
    "B", "C", "C", "C", "D", "D", "D", "D", "D", "D", "E", "E", "E", "E", "E",
    "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F",
    "F", "G", "G", "G", "G", "H", "H", "H", "I", "I", "I", "I", "I", "I", "I",
    "I", "I", "I", "I", "I", "J", "J", "K", "K", "L", "L", "L", "L", "L", "M",
    "M", "M", "N", "N", "N", "N", "N", "N", "N", "N", "O", "O", "O", "O", "O",
    "O", "O", "O", "O", "O", "O", "P", "P", "P", "Q", "Q", "R", "R", "R", "R",
    "R", "R", "R", "R", "R", "S", "S", "S", "S", "S", "S", "T", "T", "T", "T",
    "T", "T", "T", "T", "T", "U", "U", "U", "U", "U", "U", "V", "V", "V", "W",
    "W", "W", "X", "X", "Y", "Y", "Y", "Z", "Z",
  ],
  boardDropAreas: {},
  dropZoneValues: [],
  gameStarted: false,
  heightOfLettersArea: null,
  lettersOnBoard: [],
  loading: false,
  numAreas: 100,
  // numAreas: 300,
  userHand: [],
});

export default function reducers($$state = $$initialState, action = 'initial') {
  const { dropZoneValues, height, letter, loading, type, zone } = action;

  switch (type) {
    case PASS_OUT_USER_HAND: {
      const availablePieces = $$state.availablePieces;

      const numPieces = GLOBAL.STARTERHAND;
      let max = availablePieces.length - 1;
      const randNums = [];
      const userHand = [];
      for (let i = 0; randNums.length < numPieces; i++) {
        let rand = Math.floor(Math.random() * max);
        if (!randNums.indexOf(rand) > -1) {
          randNums.push(rand);
          userHand.push(availablePieces[rand]);
          availablePieces.splice(rand, 1);
          max -= 1;
        }
      }

      return { ...$$state, userHand, availablePieces };
    }

    case SET_HEIGHT_OF_LETTERS_AREA: {
      return { ...$$state, heightOfLettersArea: height };
    }

    case SET_DROP_ZONE_VALUES: {
      return { ...$$state, dropZoneValues }
    }

    case ADD_BOARD_DROP_ZONE: {
      let boardDropAreas = $$state.boardDropAreas;
      const headerHeight = GLOBAL.DIMENSIONS.HEADER_HEIGHT

      const yValue = zone.y + headerHeight
      if (boardDropAreas[yValue]) {
        boardDropAreas[yValue].push(zone.x);
      } else {
        boardDropAreas[yValue] = [zone.x];
      }

      boardDropAreas[yValue] = boardDropAreas[yValue].sort((a, b) => { return a - b })

      return { ...$$state, boardDropAreas, loading };
    }

    case EXCHANGE_FOR_THREE: {
      const availablePieces = $$state.availablePieces;
      const numPieces = availablePieces.length < 4 ? availablePieces.length : 3;
      let max = availablePieces.length - 1;
      const randNums = [];
      const userHand = $$state.userHand;

      // remove letter from userHand
      const index = userHand.indexOf(letter);
      userHand.splice(index, 1);

      // add three random letters to userHand from availablePieces
      for (let i = 0; randNums.length < numPieces; i++) {
        let rand = Math.floor(Math.random() * max);
        if (!randNums.indexOf(rand) > -1) {
          randNums.push(rand);
          userHand = [...userHand, availablePieces[rand]]
          availablePieces.splice(rand, 1);
          max -= 1;
        }
      }

      return { ...$$state, availablePieces: [...availablePieces, letter], userHand }
    }

    default: {
      return $$state;
    }
  }
}
