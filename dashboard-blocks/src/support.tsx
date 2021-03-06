import { useTheme, ThemeProvider } from '@chakra-ui/core'
import React, { useMemo, cloneElement } from 'react'
import merge from 'lodash/fp/merge'

export function PropagatedThemeProvider({ theme, children }) {
    const existingTheme = useTheme()
    // console.log({ existingTheme: existingTheme.colors })
    // console.log({ new: theme.colors })
    const merged = useMemo(() => {
        return merge(existingTheme || {}, theme)
    }, [theme, existingTheme])
    return <ThemeProvider theme={merged}>{children}</ThemeProvider>
}

export function extractPathItems(path): string[] {
    return path
        .split('/')
        .map((x) => x.trim())
        .filter(Boolean)
}

export const dummyUrl = 'http://example.com'