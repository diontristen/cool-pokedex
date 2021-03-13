

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Box,
    Input,
    InputGroup,
    FormControl,
    FormLabel,
    IconButton,
    FormHelperText,
    InputRightElement,
    HStack,
    useColorMode,
} from '@chakra-ui/react'
import { SearchIcon, CloseIcon } from '@chakra-ui/icons'


export default function SearchPokemon() {
    const { colorMode } = useColorMode();
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');

    const labelColor = {
        light: "#ebebeb",
        dark: "#1f1f1f"
    }


    const handleChangeSearch = (e) => {
        setSearchValue(e.target.value.toLowerCase())
    }

    const handleSubmitSearch = async() => {
    }

    const handleClearField = () => {
    }

    return (
        <Box w="100%">
            <FormControl id="search" mt="1">
                <FormLabel fontSize="2xl" color={labelColor[colorMode]}>Find a Pokémon</FormLabel>
                <HStack spacing={0}>
                    <InputGroup size="md">
                        <Input
                            bg="white"
                            pr="4.5rem"
                            type="text"
                            value={searchValue}
                            placeholder="Bulbasaur"
                            onChange={handleChangeSearch}
                        />
                        <InputRightElement onClick={handleClearField}  hidden={searchValue.length <= 0 ? true : false} children={<CloseIcon color="red.500" />} />
                    </InputGroup>
                    <IconButton onClick={handleSubmitSearch} bg="white" aria-label="Search Pokemon" icon={<SearchIcon />} />
                </HStack>
                <FormHelperText color={labelColor[colorMode]}>You can search a pokemon by name or id.</FormHelperText>
            </FormControl>
        </Box>
    )
}