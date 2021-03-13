import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import PokemonCard from '../components/PokemonCard'
import PokemonDetail from '../components/PokemonDetail'

import { SimpleGrid, Center, Text } from '@chakra-ui/react'
import { GetPokemonTeamService } from '../services/PokemonService'

export default function MyTeam() {
    document.title = 'Pokédex'
    const reducer = useSelector(state => state)
    const { pokemonTeam } = reducer
    const [localPokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        async function fetchPokemon() {
            let myTeam = localStorage.getItem('my-pokemon-team')

            if (pokemonTeam.length === 0) {
                myTeam = JSON.parse(myTeam)
                let result = await GetPokemonTeamService(myTeam)
                setPokemonList(result)
            } else {
                let result = await GetPokemonTeamService(pokemonTeam)
                setPokemonList(result)
            }
        }
        fetchPokemon()
    }, [pokemonTeam])

    return (
        <>
            <Center>
                <Text fontSize="6xl" >My Pokemon Team</Text>
            </Center>
            <SimpleGrid
                columns={[1, 2, 3, 3, 3]}
                spacing={2}
                alignSelf="center"
                alignItems="center"
                width={['90vw', '90vw', '90vw', '80vw', '60vw']}
                mt="16px"
            >
                {
                    localPokemonList.length !== 0 ?
                        localPokemonList.map((pokemon, index) => (
                            <PokemonCard key={index} pokemon={pokemon} />
                        ))
                        :
                        <Center>
                            <Text fontSize="sm" fontWeight="semibold" > Please add a Pokemon in your team! Go back to Pokedex now!</Text>
                        </Center>
                }
            </SimpleGrid>
            <PokemonDetail />
        </>
    )
}