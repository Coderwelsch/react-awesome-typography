import { createTheme } from "@mui/material"


const uiFont = [
	'-apple-system',
	'BlinkMacSystemFont',
	'"Segoe UI"',
	'Roboto',
	'"Helvetica Neue"',
	'Arial',
	'sans-serif',
	'"Apple Color Emoji"',
	'"Segoe UI Emoji"',
	'"Segoe UI Symbol"',
].join(',')

export const darkTheme = createTheme({
	typography: {
		fontFamily: [
			"Georgia",
		].join(", "),
		fontSize: 16,
		button: {
			fontFamily: "Arial",
			textTransform: "none",
		},
		caption: {
			fontFamily: uiFont
		},
		subtitle1: {
			fontFamily: uiFont
		},
		subtitle2: {
			fontFamily: uiFont
		}
	},
	components: {
		MuiDivider: {
			defaultProps: {
				sx: {
					color: "hsl(203,30%,55%)",
					fontSize: "0.65rem",
					letterSpacing: "0.01rem",
					textTransform: "uppercase",
					fontFamily: uiFont,
				}
			}
		}
	},
	palette: {
		mode: "dark",
		text: {
			primary: "#b3b7b9",
		},
		background: {
			default: "hsl(204, 24%, 10%)"
		},
		divider: "hsla(206,30%,79%, 0.25)"
	},
})