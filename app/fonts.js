import {Urbanist , Inter , Poppins} from '@next/font/google'

export const urbanist = Urbanist({
    subsets: ['latin'],
    variable: '--font-urbanist',
    weight: ['400', '500', '600', '700', '800'],
})

export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    weight: ['400', '500', '600', '700', '800'],
})

export const poppins = Poppins({
    subsets: ['latin'],
    variable: '--font-poppins',

    weight: ['400', '500', '600', '700', '800'],
})