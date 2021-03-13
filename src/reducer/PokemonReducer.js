const initState = {
    pokemonList: [],
    searchList: null,
    didSearch: false,
}

const PokemonReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_POKEMON":
            let valid = action.payload ? true : false
            return {
                ...state,
                pokemonList: valid ? action.payload : [],
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
        default:
            return state;
    }

}

export default PokemonReducer;