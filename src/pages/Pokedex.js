import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { SimpleGrid, Text, Flex, Box, CircularProgress, useColorMode, VStack } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { BottomScrollListener } from 'react-bottom-scroll-listener';
import PokemonCard from '../components/PokemonCard'
import SearchPokemon from '../components/SearchPokemon'
import PokemonDetail from '../components/PokemonDetail'
import { GetPokemonService } from '../services/PokemonService'

export default function Pokedex() {
    const { colorMode } = useColorMode();
    const dispatch = useDispatch();
    const reducer = useSelector(state => state)
    const { pokemonList, searchList, didSearch, pokemonOffset } = reducer
    const [localPokemonList, setPokemonList] = useState([]);
    const [isCallback, triggerCallback] = useState(false)
    const [showLoading, setShowLoading] = useState(true)

    const searchBgColor = {
        light: "gray.800",
        dark: "gray.200"
    }



    useEffect(() => {
        async function setPokemon() {
            let result = await GetPokemonService(pokemonOffset)
            dispatch({
                type: "SET_POKEMON",
                payload: result[1]
            })
        }
        setPokemon();
    }, [dispatch, pokemonOffset])

    useEffect(() => {
        if (!didSearch) {
            if (pokemonList.length <= 0) {
                setPokemonList([])
            } else {
                setPokemonList(pokemonList)
                triggerCallback(false)

            }
        }
    }, [pokemonList, didSearch])

    useEffect(() => {
        if (didSearch) {
            if (searchList.length !== 0) {
                setPokemonList(searchList)
            } else {
                setPokemonList([])
                console.log("HERE")
                setShowLoading(false)
            }
        }
    }, [searchList, didSearch])

    function callback() {
        if (!isCallback) {
            triggerCallback(true)
            let newOffset = pokemonOffset + 20
            dispatch({
                type: "UPDATE_OFFSET",
                payload: newOffset
            })
        }
    }
    return (
        <>
            <BottomScrollListener offset="500" onBottom={callback}>
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
                            )) : <></>

                    }
                </SimpleGrid>
                <Box mt="16" hidden={localPokemonList.length === 0 ? false : true} display="flex" w="100vw" flexDirection="row" justifyContent="center" alignItems="center">
                    <VStack>
                    <SearchIcon fontSize="6xl" />
                    <Text fontSize="2xl" fontWeight="semibold" > Pokemon Not Found</Text>
                    </VStack>
                </Box>
                <Box hidden={!showLoading} mt="8" display="flex" w="100vw" justifyContent="center" alignItems="center">
                    <CircularProgress isIndeterminate color="green.300" />
                </Box>
            </BottomScrollListener>
            <PokemonDetail />
        </>
    )
}