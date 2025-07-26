import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

type Props = {
    background?: string
}

export const NavButton = styled(Button)<Props> (({background, theme}) => ({
    minWidth: '110px',
    fontWeight: 'bold',
    margin: '0 10px',
    padding: '8px 24px',
    color: theme.palette.primary.contrastText,
    background: background || theme.palette.primary.main,
}))