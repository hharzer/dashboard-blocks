import { css, Global } from '@emotion/core'
import { SideNavLink } from './NavLink'
import React, { ReactNode, useMemo, Children } from 'react'
import {
    Stack,
    Box,
    ITheme,
    theme as chakraTheme,
    CSSReset,
    StackProps,
} from '@chakra-ui/core'
import { PropagatedThemeProvider } from './support'
import merge from 'lodash/fp/merge'

export type DashboardLayoutProps = {
    sideNavItems: ReactNode[]
    pageWidth?: any
    primary?: string
    children?: any
} & StackProps

export interface ThemeExtension extends ITheme {
    colors: {
        primary: string
        secondary: string
        black: string
        white: string
    } & ITheme['colors']
    sizes: {
        pageContainer: any
    } & ITheme['sizes']
    fontSizes: {
        text: any
        heading: any
        subheading: any
        subtext: any
    } & ITheme['fontSizes']
}

const SIDENAV_W = 200

export function DashboardLayout({
    sideNavItems,
    pageWidth = '1200px',
    primary = 'green',
    children,
    // background = 'gray.100',
    ...rest
}: DashboardLayoutProps) {
    const theme = useMemo(
        () =>
            merge(chakraTheme, {
                colors: {
                    primary,
                },
                sizes: {
                    pageWidth,
                },
            }),
        [pageWidth, primary],
    )
    return (
        <PropagatedThemeProvider theme={theme}>
            <Global styles={globalStyles} />
            <CSSReset />
            <Stack
                // bg='gray.100'
                minHeight='100%'
                align='center'
                // color={bodyColor[colorMode]}
                // fontSize={fontSize}
                fontWeight='normal'
                // fontFamily='Roboto, Arial'
                // color={colorMode == 'dark' ? 'white' : black}
                {...rest}
            >
                <Box
                    minHeight='100%'
                    position='relative'
                    w='100%'
                    maxWidth={pageWidth}
                    // px='20px' // TODO add px as landing blocks
                >
                    <SideNav
                        minHeight='100%'
                        maxW='200px'
                        items={sideNavItems}
                        alignSelf='flex-start'
                        position='fixed'
                        // left={0}
                        width={SIDENAV_W}
                        display={['none', null, 'block']}
                        overflowY='auto'
                        overflowX='hidden'
                    />
                    <Stack
                        direction='row'
                        minHeight='100%'
                        ml={['none', null, SIDENAV_W + 10]}
                        // mr={['none', null, TABLE_OF_C_W + 30 + 'px']}
                    >
                        <Stack
                            overflow='auto'
                            // px={['10px', null, '20px', '30px']}
                            flex='1'
                            minHeight='100%'
                            minW='100%'
                        >
                            {children}
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </PropagatedThemeProvider>
    )
}

export function SideNav({ items, ...rest }) {
    return (
        <Stack spacing='20px' {...rest}>
            {items.map((x) => {
                return x
            })}
        </Stack>
    )
}

const globalStyles = css`
    * {
        box-sizing: border-box;
    }
    html {
        overflow: hidden;
        min-height: 100%;
        height: 100%;
        scroll-behavior: smooth;
    }
    #__next {
        min-height: 100%;
        height: 100%;
    }
    body {
        min-height: 100%;
        height: 100%;
        overflow: auto;
        overflow-x: hidden;
        scroll-behavior: smooth;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
    }
    /* 
    html,
    body {
        margin: 0;

        padding: 0;

        min-width: 100%;
        width: 100%;
        max-width: 100%;

        min-height: 100%;
        height: 100%;
        max-height: 100%;
    } */
`