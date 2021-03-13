import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, Image, Center, Badge, Tag, Stat, StatLabel, StatNumber, CircularProgress } from '@chakra-ui/react'
import { TYPE_COLORS, TYPE_COLORS_BG } from '../helpers/Pokemon'
import LazyLoad from 'react-lazyload';
export default function PokemonCard({ pokemon }) {
    const dispatch = useDispatch();
    const reducer = useSelector(state => state)
    const { pokemonTeam } = reducer
    const [inTeam, setInTeam] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [localPokemon, setLocalPokemon] = useState('')
    useEffect(() => {
        if (localPokemon !== pokemonTeam) {
            let myTeam = []
            if (pokemonTeam.length > 0) {
                myTeam = pokemonTeam
            } else if (pokemonTeam === null || pokemonTeam.length === 0 || JSON.parse(localStorage.getItem('my-pokemon-team')) !== null) {
                myTeam = JSON.parse(localStorage.getItem('my-pokemon-team'))
            }
    
            if (myTeam) {
                if (myTeam.indexOf(pokemon.id) < 0) {
                    setInTeam(false)
                }
                if (myTeam.indexOf(pokemon.id) >= 0) {
                    setInTeam(true)
                }
            }
        }
    }, [pokemon, pokemonTeam])


    const handleViewPokemon = (id) => {
        dispatch({
            type: "TOOGLE_DRAWER"
        })
        dispatch({
            type: "SELECT_POKEMON",
            payload: id
        })
    }

    const handleImageLoad = () => {
        setImageLoaded(true)
    }

   

    return (
        <Box
            backgroundColor={TYPE_COLORS_BG[pokemon.type[0]]}
            rounded="md" _hover={{ animation: "swing", animationDuration: "0.3s", animationPlayState: "ease", animationIterationCount: 1 }}
            cursor="pointer"
            boxShadow="md"
            onClick={() => { handleViewPokemon(pokemon.id) }}
            height="100%"
        >
            <Box display="flex" flexDirection="row" justifyContent="space-between" px="2">
                <Tag mt="8px" fontSize="sm" fontWeight="extrabold" size="sm" variant="solid" bg={TYPE_COLORS[pokemon.type[0]]}>
                    #{String(pokemon.id).padStart(4, '0')}
                </Tag>
                <Text hidden={!inTeam} color="gray.500" fontSize="sm" mr="1" fontStyle="italic">Owned</Text>
            </Box>
            <Box px="24px" pb="8px" textAlign="center" >
                <Center>
                    <Box borderRadius="full" bg="gray.50" >
                    <CircularProgress hidden={imageLoaded} isIndeterminate color="green.300" />
                    <LazyLoad height={200} once >
                            <Image onLoad={handleImageLoad} zIndex="10" src={pokemon.image.url} />
                        </LazyLoad>
                       
                    </Box>

                </Center>
                <Text fontSize="xl" fontWeight="extrabold" textTransform="capitalize">
                    {pokemon.name}
                </Text>
                {pokemon.type.map((type, index) => (
                    <Badge key={index} px="4" mx="1" rounded="md" color="black" backgroundColor={TYPE_COLORS[type]}> {type} </Badge>
                ))}
            </Box>
            <Box px="16px" pb="8px" >
                <Stat>
                    <StatLabel fontSize="sm" fontWeight="extrabold" >Weight:</StatLabel>
                    <StatNumber fontSize="xs" fontWeight="thin">{pokemon.weight}</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel fontSize="sm" fontWeight="extrabold" >Height:</StatLabel>
                    <StatNumber fontSize="xs" fontWeight="thin">{pokemon.height}</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel fontSize="sm" fontWeight="extrabold" >Abiltiies:</StatLabel>
                    {pokemon.abilities.map((ability, index) => (
                        <StatNumber key={index} fontSize="xs" textTransform="capitalize" fontWeight="thin">{ability}</StatNumber>
                    ))}
                </Stat>
            </Box>
        </Box>
    )
}