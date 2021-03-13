const initState = {
    pokemonList: [],
    pokemonOffset: 0,
    searchList: null,
    didSearch: false,
    openDrawer: false,
    selectedPokemonId: null,
    pokemonTeam: []
}

const PokemonReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_POKEMON":
            let valid = action.payload ? true : false
            return {
                ...state,
                pokemonList: valid ? state.pokemonList.concat(action.payload) : [],
                didSearch: false
            };
        case "SEARCH_POKEMON":
            return {
                ...state,
                searchList: action.payload.length !== 0 ? [action.payload] : [],
                didSearch: true
            };
        case "CLEAR_SEARCH":
            return {
                ...state,
                didSearch: false
            };
        case "UPDATE_OFFSET":
            return {
                ...state,
                pokemonOffset: action.payload
            }
        case "TOOGLE_DRAWER":
            return {
                ...state,
                openDrawer: !state.openDrawer
            }
        case "SELECT_POKEMON":
            return {
                ...state,
                selectedPokemonId: action.payload
            }
        case "ADD_POKEMON":
            return {
                ...state,
                pokemonTeam: [...state.pokemonTeam, action.payload]
            }
        case "REMOVE_POKEMON":
            return {
                ...state,
                pokemonTeam: action.payload
            }
        default:
            return state;
    }

}

export default PokemonReducer;