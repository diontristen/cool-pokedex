import axios from "axios";
import { parsePokemonList, parseSelectedPokemon, parseOffset } from '../helpers/Parser'

export const GetPokemonService = async (offset) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
        const result = await axios.get(url)
            .then(async (response) => {
                if (response.data.results) {
                    const promises = response.data.results.map(pokemon => axios.get(pokemon.url)
                        .then(item => {
                            return parsePokemonList(item.data)
                        }
                        ));
                    return Promise.all(promises)
                        .then(item => {
                            
                            return [parseOffset(response.data.next), item]
                        })
                        .catch(error => console.log("outer error: ", error))
                }
            })
        return result
    } catch (error) {
        console.log(error)
    }
}

export const SearchPokemonService = async (searchValue) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${searchValue}`
        const result = await axios.get(url);
        if (result.data) {
            return parsePokemonList(result.data)
        }
    } catch (error) {
        console.log(error)
        return []
    }
}

export const GetSelectedPokemonService = async (pokemonId) => {
    try {
        const urlOne = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        const urlTwo = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
        const requestOne = await axios.get(urlOne);
        const requestTwo = await axios.get(urlTwo);
        return await axios.all([requestOne, requestTwo]).then(axios.spread(async (...responses) => {
            const responseOne = responses[0].data
            const responseTwo = responses[1].data
            return parseSelectedPokemon(responseOne, responseTwo)
        })).catch(errors => {
            console.log(errors)
        })
    } catch (error) {
        console.log(error)
        return []
    }
}

export const GetPokemonTeamService = async (pokemonTeam) => {
    try {
        const promises = pokemonTeam.map(pokemon => axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(item => {
                return parsePokemonList(item.data)
            }));
        return Promise.all(promises)
            .then(item => {
                return item
            })
            .catch(error => console.log("outer error: ", error))
    } catch (error) {
        console.log(error)
        return []
    }
}