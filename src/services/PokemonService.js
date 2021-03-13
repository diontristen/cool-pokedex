import axios from "axios";
import { parsePokemonList } from '../helpers/Parser'

export const GetPokemonService = async () => {
    try {
        const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
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
                            return item
                        })
                        .catch(error => console.log("outer error: ", error))
                }
            })
        return result
    } catch (error) {
        console.log(error)
    }
}

