import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { SimpleGrid, Center, Text, Flex, Box, useColorMode } from '@chakra-ui/react'
import PokemonCard from '../components/PokemonCard'
import SearchPokemon from '../components/SearchPokemon'
import { GetPokemonService } from '../services/PokemonService'

export default function Pokedex() {
    document.title = 'Pokédex'
    const { colorMode } = useColorMode();
    const dispatch = useDispatch();
    const reducer = useSelector(state => state)
    const { pokemonList, searchList, didSearch } = reducer
    const [localPokemonList, setPokemonList] = useState([]);


    const searchBgColor = {
        light: "gray.800",
        dark: "gray.200"
    }

    useEffect(() => {
        async function setPokemon() {
            let result = await GetPokemonService()
            dispatch({
                type: "SET_POKEMON",
                payload: result
            })
        }
        setPokemon();
    }, [dispatch])

    useEffect(() => {
        if (!didSearch) {
            if (pokemonList.length <= 0) {
                setPokemonList([])
            } else {
                setPokemonList(pokemonList)
            }
        }
    }, [pokemonList, didSearch])

    useEffect(() => {
        if (didSearch) {
            if (searchList.length !== 0) {
                setPokemonList(searchList)
            } else {
                setPokemonList([])
            }
        }
    }, [searchList, didSearch])

    return (
        <>
            <Box w="100vw" bg={searchBgColor[colorMode]} mb="2">
                <Flex
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    maxWidth="800px"
                    minWidth="356px"
                    width="100%"
                    as="nav"
                    px={[2, 6, 6]}
                    py={2}
                    mx="auto">
                    <SearchPokemon />
                </Flex>
            </Box>
            <SimpleGrid
                columns={[1, 2, 3, 4, 4]}
                spacing={2}
                alignSelf="center"
                alignItems="center"
                width={['90vw', '90vw', '90vw', '80vw', '60vw']}
            >
                {
                    localPokemonList.length !== 0 ?
                        localPokemonList.map((pokemon, index) => (
                            <PokemonCard key={index} pokemon={pokemon} />
                        ))
                        :
                        <Center>
                            <Text fontSize="sm" fontWeight="semibold" > Pokemon Not Found</Text>
                        </Center>
                }
            </SimpleGrid>
        </>
    )
}