import { Flex, Box, Button, useColorMode } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import styled from '@emotion/styled'

export default function NavBar() {
    const { colorMode } = useColorMode();

    const bgColor = {
        light: "red.400",
        dark: "#2e2e2e"
    }

    const navHoverBg = {
        light: "gray.600",
        dark: "gray.300"
    }

    const StickNav = styled(Flex)`
        position: sticky;
        z-index: 10;
        top: 0;
        transition: height .5s, line-height .5s;
    `

    return (
        <>
            <StickNav
                w="100%"
                bg={bgColor[colorMode]}
                as="nav"
                px={[2, 6, 6]}
                pt={2}
                mx="auto">
                <Box
                    w="50%"
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mx="auto"
                >
                    <Box>

                        <Link to="/">
                            <Button  variant="ghost" cursor="pointer" p={[1, 2, 4]} _hover={{ bgColor: navHoverBg[colorMode] }}>
                                Pokédex
                            </Button>
                        </Link>
                        <Link to="/myteam">
                            <Button  variant="ghost" cursor="pointer" p={[1, 2, 4]} _hover={{ bgColor: navHoverBg[colorMode] }}>
                                My Téam
                            </Button>
                        </Link>
                    </Box>
                    <ColorModeSwitcher />
                </Box>
            </StickNav>
        </>
    )

}