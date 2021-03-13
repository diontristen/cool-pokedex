import { useDispatch } from 'react-redux';
import { Box, Text, Image, Center, Badge, Tag, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import { TYPE_COLORS, TYPE_COLORS_BG } from '../helpers/Pokemon'

export default function PokemonCard({ pokemon }) {
    const dispatch = useDispatch();
 

    const handleViewPokemon = (id) => {
        dispatch({
            type: "TOOGLE_DRAWER"
        })
        dispatch({
            type: "SELECT_POKEMON",
            payload: id
        })
    }

    return (
        <Box 
        backgroundColor={TYPE_COLORS_BG[pokemon.type[0]]}
        rounded="md" _hover={{ animation: "swing", animationDuration: "0.3s", animationPlayState: "ease", animationIterationCount: 1 }}
        cursor="pointer"
        boxShadow="md"
        onClick={() => {handleViewPokemon(pokemon.id)}}
        height="100%"
        >
            <Tag ml="8px" mt="8px" fontSize="sm" fontWeight="extrabold" size="sm" variant="solid" bg={TYPE_COLORS[pokemon.type[0]]}>
                #{String(pokemon.id).padStart(4, '0')}
            </Tag>
            <Box px="24px" pb="8px" textAlign="center" >
                <Center>
                    <Box borderRadius="full" bg="gray.50" >
                    <Image zIndex="10" alt={pokemon.image.alt} src={pokemon.image.url} />
                    </Box>
                   
                </Center>
                <Text fontSize="xl" fontWeight="extrabold" textTransform="capitalize">
                    {pokemon.name}
                </Text>
                {pokemon.type.map((type, index) => (
                    <Badge key={index} px="4" mx="1" rounded="md" color="white" backgroundColor={TYPE_COLORS[type]}> {type} </Badge>
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