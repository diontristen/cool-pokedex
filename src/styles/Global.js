import { Global, css } from '@emotion/react'
import { useColorMode } from '@chakra-ui/react'

export const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode()

  return (
    <>
      <Global
        styles={css`
            ::selection {
              background-color: #90CDF4;
              color: #fefefe;
            }
            ::-moz-selection {
              background: #ffb7b7;
              color: #fefefe;
            }
            html {
              min-width: 356px;
              scroll-behavior: smooth;
            }
            #root {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
              min-width:100vw;
              background: ${colorMode === 'light' ? '#eeedef' : '#2e2e2e'};
            }
            @keyframes swing
            {
                0%
                {
                    -webkit-transform: translateX(5px);
                    transform: translatey(0);
                }
                50%
                {
                    -webkit-transform: translateX(3px);
                    transform: translateY(-10px);
                }
            
                100%
                {
                    -webkit-transform: translateX(0);
                    transform: translateY(0);
                }
            }
          `}
      />
      {children}
    </>
  )
}