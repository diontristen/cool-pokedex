const initState = {
    pokemonList: [],
}

const PokemonReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_POKEMON":
            let valid = action.payload ? true : false
            return {
                ...state,
                pokemonList: valid ? action.payload : [],
            };
        default:
            return state;
    }

}

export default PokemonReducer;