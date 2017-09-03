// Constants
export const SETUP_GAME = 'app/messages/SETUP_GAME';

// Actions
export function setupGame() {
  return {
    type: SETUP_GAME,
  };
}

// Reducers
const $$initialState = ({ availablePieces: ['a'] });

export default function reducers($$state = $$initialState, action = 'initial') {
  const { type } = action;

  switch (type) {
    case SETUP_GAME: {
      return $$state;
    }

    default: {
      return $$state;
    }
  }
}
