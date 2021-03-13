import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    useDisclosure,
    Text,
    VStack,
    HStack,
    Box,
    Image,
    Tag,
    Badge,
    Stat,
    StatLabel,
    StatNumber,
    Flex,
    Spacer,
    Progress,
    Button,
    CircularProgress,
    CloseButton
} from '@chakra-ui/react'
import { ChevronRightIcon, AddIcon, MinusIcon } from '@chakra-ui/icons'
import { GetSelectedPokemonService } from '../services/PokemonService'
import { TYPE_COLORS, TYPE_COLORS_BG } from '../helpers/Pokemon'


export default function PokemonDetail() {
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const reducer = useSelector(state => state)
    const { openDrawer, selectedPokemonId, pokemonTeam } = reducer
    const [pokemon, setPokemon] = useState('')
    const [inTeam, setInTeam] = useState(false)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if (openDrawer) {
            onOpen()
        }

    }, [openDrawer, onOpen])

    useEffect(() => {
        async function getPokemon() {
            let result = await GetSelectedPokemonService(selectedPokemonId)
            setPokemon(result)
            setLoading(false)
        }
        if (selectedPokemonId !== null) {
            setLoading(true)
            getPokemon()
        }
    }, [selectedPokemonId])

    useEffect(() => {
        if (pokemonTeam.indexOf(pokemon.id) < 0) {
            setInTeam(false)
        }
        if (pokemonTeam.indexOf(pokemon.id) >= 0) {
            setInTeam(true)
        }
    }, [pokemon, pokemonTeam])

    const handleEventPokemon = (id) => {
        let mode = inTeam ? "remove" : "add"
        if (mode === "add") {
            if (pokemonTeam.indexOf(id) < 0 && pokemonTeam.length < 6) {
                dispatch({
                    type: "ADD_POKEMON",
                    payload: id
                })
                setInTeam(true)
            }
        }
        if (mode === "remove") {
            if (pokemonTeam.indexOf(id) >= 0 && pokemonTeam.length > 0) {
                let newPokemonTeam = pokemonTeam.filter(item => item !== id)
                dispatch({
                    type: "REMOVE_POKEMON",
                    payload: newPokemonTeam
                })
                if (newPokemonTeam.length === 0) {
                    localStorage.setItem('my-pokemon-team', JSON.stringify(newPokemonTeam))
                }
                setInTeam(false)
            }
        }
    }

    useEffect(() => {
        if (pokemonTeam.length !== 0) {
            localStorage.setItem('my-pokemon-team', JSON.stringify(pokemonTeam))
        }
    }, [pokemonTeam])

    const handleClose = () => {
        dispatch({
            type: "TOOGLE_DRAWER"
        })
        onClose()
    }

    return (
        <>
            {pokemon !== '' ?
                <Drawer onClose={handleClose} isOpen={isOpen} size="xl">
                    <DrawerOverlay>
                        <DrawerContent>
                            <DrawerHeader hidden={isLoading} ml="8px" mt="8px" display="flex" flexDirection="row"  >
                                <CloseButton mr="2" onClick={handleClose} />
                                <Box display="flex" flexDirection="row" justifyContent="space-between" w="100%">
                                <Tag fontSize="md" fontWeight="extrabold" size="sm" variant="solid" bg={TYPE_COLORS[pokemon.type[0]]}>
                                    #{String(pokemon.id).padStart(4, '0')}
                                </Tag>
                                <Button float="right" onClick={() => { handleEventPokemon(pokemon.id) }} ml="8" leftIcon={inTeam ? <MinusIcon /> : <AddIcon />} size="sm" bg={inTeam ? "red.300" : "blue.300"} variant="solid">
                                    {inTeam ? 'Remove' : 'Add'} <Text mx="1" textTransform="capitalize">{pokemon.name}</Text> to your Team
                                 </Button>
                                </Box>
                            </DrawerHeader>
                            <Box hidden={!isLoading}>
                                <CircularProgress isIndeterminate color="green.300" />
                            </Box>
                            <DrawerBody hidden={isLoading}>
                                <VStack spacing="24px">
                                    <Text fontSize="6xl" textTransform="capitalize" >{pokemon.name}</Text>
                                    <Box borderRadius="full" bg="gray.50" >
                                        <Image zIndex="10" w="150%" alt={pokemon.image.alt} src={pokemon.image.url} />
                                    </Box>
                                    <HStack justifyContent="center">
                                        {pokemon.type.map((type, index) => (
                                            <Badge key={index} px="4" mx="1" rounded="md" color="white" backgroundColor={TYPE_COLORS[type]}> {type} </Badge>
                                        ))}
                                    </HStack>
                                    <Text fontStyle="italic" >{pokemon.description}</Text>
                                    <Box w="100%" bg="gray.100" borderRadius="lg" px="4" py="4" >
                                        <HStack mb="2">
                                            <Stat>
                                                <StatLabel fontSize="lg">Weight</StatLabel>
                                                <StatNumber fontSize="md" >{pokemon.weight}</StatNumber>
                                            </Stat>
                                            <Stat>
                                                <StatLabel fontSize="lg">Height</StatLabel>
                                                <StatNumber fontSize="md">{pokemon.height}</StatNumber>
                                            </Stat>
                                        </HStack>
                                        <HStack mb="2">
                                            <Stat>
                                                <StatLabel fontSize="lg">Color</StatLabel>
                                                <StatNumber textTransform="capitalize" fontSize="md" >{pokemon.color}</StatNumber>
                                            </Stat>
                                            <Stat>
                                                <StatLabel fontSize="lg">Egg Group</StatLabel>
                                                <StatNumber fontSize="md" textTransform="capitalize" >
                                                    {pokemon.egg_groups.join()}
                                                </StatNumber>
                                            </Stat>
                                        </HStack>
                                        <HStack mb="2">
                                            <Stat>
                                                <StatLabel fontSize="lg">Growth Rate</StatLabel>
                                                <StatNumber fontSize="md">{pokemon.growth_rate}</StatNumber>
                                            </Stat>
                                            <Stat>
                                                <StatLabel fontSize="lg">Category</StatLabel>
                                                <StatNumber fontSize="md">{pokemon.category}</StatNumber>
                                            </Stat>
                                        </HStack>

                                        <HStack mb="2">
                                            <Stat>
                                                <StatLabel fontSize="lg">Habitat</StatLabel>
                                                <StatNumber fontSize="md" textTransform="capitalize">{pokemon.habitat}</StatNumber>
                                            </Stat>

                                            <Stat>
                                                <StatLabel fontSize="lg">Abilities</StatLabel>
                                                {pokemon.abilities.map((ability, index) => (
                                                    <StatNumber fontSize="md" key={index} textTransform="capitalize" >{ability}</StatNumber>
                                                ))}
                                            </Stat>
                                        </HStack>
                                    </Box>
                                    <Box w="100%" mt="2" borderRadius="xl" bg={TYPE_COLORS_BG[pokemon.type[0]]} px="4" py="4">
                                        <Text fontSize="lg" fontWeight="extrabold">Stats:</Text>
                                        <Flex>
                                            <Box >
                                                <Text fontSize="sm">HP:</Text>
                                            </Box>
                                            <Spacer />
                                            <Box mr="8">
                                                <Badge fontSize="xs" >{pokemon.stats.hp}</Badge>
                                            </Box>
                                            <Box width="60%" justifyContent="center">
                                                <Progress isAnimated size="lg" hasStripe value={pokemon.stats.hp} />
                                            </Box>
                                        </Flex>
                                        <Flex>
                                            <Box>
                                                <Text fontSize="sm">ATTACK:</Text>
                                            </Box>
                                            <Spacer />
                                            <Box mr="8">
                                                <Badge fontSize="xs" >{pokemon.stats.attack}</Badge>
                                            </Box>
                                            <Box width="60%" >
                                                <Progress size="lg" isAnimated hasStripe value={pokemon.stats.attack} />
                                            </Box>
                                        </Flex>
                                        <Flex>
                                            <Box>
                                                <Text fontSize="sm">DEFENSE:</Text>
                                            </Box>
                                            <Spacer />
                                            <Box mr="8">
                                                <Badge fontSize="xs" >{pokemon.stats.defense}</Badge>
                                            </Box>
                                            <Box width="60%" >
                                                <Progress size="lg" isAnimated hasStripe value={pokemon.stats.defense} />
                                            </Box>
                                        </Flex>
                                        <Flex>
                                            <Box>
                                                <Text fontSize="sm">SP. ATTACK:</Text>
                                            </Box>
                                            <Spacer />
                                            <Box mr="8">
                                                <Badge fontSize="xs" >{pokemon.stats.spAttack}</Badge>
                                            </Box>
                                            <Box width="60%" >
                                                <Progress size="lg" isAnimated hasStripe value={pokemon.stats.spAttack} />
                                            </Box>
                                        </Flex>
                                        <Flex>
                                            <Box>
                                                <Text fontSize="sm">SP. DEFENSE:</Text>
                                            </Box>
                                            <Spacer />
                                            <Box mr="8">
                                                <Badge fontSize="xs" >{pokemon.stats.spDefense}</Badge>
                                            </Box>
                                            <Box width="60%" >
                                                <Progress size="lg" isAnimated hasStripe value={pokemon.stats.spDefense} />
                                            </Box>
                                        </Flex>
                                        <Flex>
                                            <Box>
                                                <Text fontSize="sm">SPEED:</Text>
                                            </Box>
                                            <Spacer />
                                            <Box mr="8">
                                                <Badge fontSize="xs" >{pokemon.stats.speed}</Badge>
                                            </Box>
                                            <Box width="60%" justifyContent="space-between">
                                                <Progress size="lg" isAnimated hasStripe value={pokemon.stats.speed} />
                                            </Box>
                                        </Flex>
                                    </Box>
                                    <Box px="4" py="4">
                                        <Box textAlign="left">
                                            <Text>Evolution</Text>
                                        </Box>
                                        <HStack>
                                            <Box borderRadius="full" bg="gray.50" w="40%" textAlign="center">
                                                <Image zIndex="10" src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} />
                                                <Text>Bulbasaur #001</Text>
                                                <HStack justifyContent="center">
                                                    {pokemon.type.map((type, index) => (
                                                        <Badge key={index} px="4" mx="1" rounded="md" color="white" backgroundColor={TYPE_COLORS[type]}> {type} </Badge>
                                                    ))}
                                                </HStack>
                                            </Box>
                                            <ChevronRightIcon w="24" h="24" />
                                            <Box borderRadius="full" bg="gray.50" w="40%" textAlign="center">
                                                <Image zIndex="10" src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} />
                                                <Text>Bulbasaur #001</Text>
                                                <HStack justifyContent="center">
                                                    {pokemon.type.map((type, index) => (
                                                        <Badge key={index} px="4" mx="1" rounded="md" color="white" backgroundColor={TYPE_COLORS[type]}> {type} </Badge>
                                                    ))}
                                                </HStack>
                                            </Box>
                                            <ChevronRightIcon w="24" h="24" />
                                            <Box borderRadius="full" bg="gray.50" w="40%" textAlign="center">
                                                <Image zIndex="10" src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} />
                                                <Text>Bulbasaur #001</Text>
                                                <HStack justifyContent="center">
                                                    {pokemon.type.map((type, index) => (
                                                        <Badge key={index} px="4" mx="1" rounded="md" color="white" backgroundColor={TYPE_COLORS[type]}> {type} </Badge>
                                                    ))}
                                                </HStack>
                                            </Box>
                                        </HStack>
                                    </Box>
                                </VStack>
                            </DrawerBody>
                        </DrawerContent>
                    </DrawerOverlay>
                </Drawer>
                : <></>}

        </>
    )
}