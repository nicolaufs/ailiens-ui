
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

/* 
&#128125; alien
&#128377; joystick 
&#128434; blue
&#128640; rocket
&#128760; ufo
&#127761; black moon
&#127769; pretty moon
&#128065; eye
&#128301; telescope
&#x2604; comet
&#x1fa90; ringed planet
*/

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const colors = {
    background: "#222",
    accent: "black",
    bodyText: "rgba(255, 255, 255, 1.0)",
}

const fonts = {
    heading: `'Exo 2', sans-serif`,
    body: `'Exo 2', sans-serif`,
}

const components = {
    Modal: {
        baseStyle: {
            dialog: {
                bg: "#020202"
            }
        },
    },
    Button: {
        variants: {
            outline: {
                color: 'white',
                _hover: {
                    bg: '#101010',
                },
                _active: {
                    bg: '#101010',
                },
                bg: '#050505',
                border: '2px solid #222',
                borderColor: '#222',

            }
        }
    }
}

const theme = extendTheme({ config, colors, fonts, components })

export default theme


