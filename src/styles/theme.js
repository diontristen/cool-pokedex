import { extendTheme, theme as chakraTheme} from "@chakra-ui/react"
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts  = {
    ...chakraTheme.fonts,
    body: `"Flexo-Regular",arial,sans-serif`,
    heading: `"Flexo-Regular",arial,sans-serif`
}

const breakpoints = createBreakpoints({
    sm: "40em",
    md: "60em",
    lg: "80em",
    xl: "96em"
})

const overrides = {
    ...chakraTheme,
    fonts,
    breakpoints
}

const customTheme = extendTheme(overrides)

export default customTheme