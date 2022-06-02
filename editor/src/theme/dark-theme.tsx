import { createTheme } from "@mui/material"


export const UiFont = [
	"-apple-system",
	"BlinkMacSystemFont",
	"\"Segoe UI\"",
	"Roboto",
	"\"Helvetica Neue\"",
	"Arial",
	"sans-serif",
	"\"Apple Color Emoji\"",
	"\"Segoe UI Emoji\"",
	"\"Segoe UI Symbol\"",
].join(",")

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
			fontFamily: UiFont,
		},
		subtitle1: {
			fontFamily: UiFont,
		},
		subtitle2: {
			fontFamily: UiFont,
		},
	},
	components: {
		MuiDivider: {
			defaultProps: {
				sx: {
					color: "rgba(255, 255, 255, 0.3)",
					fontSize: "0.65rem",
					letterSpacing: "0.03rem",
					textTransform: "uppercase",
					fontFamily: UiFont,
				},
			},
		},
		MuiPaper: {
			defaultProps: {
				elevation: 0,
			},
		},
		MuiAutocomplete: {
			defaultProps: {
				sx: {
					"input::placeholder": {
						fontFamily: UiFont,
					}
				}
			}
		}
	},
	palette: {
		mode: "dark",
		primary: {
			main: "#FFB793",
		},
		text: {
			primary: "#b3b7b9",
		},
		background: {
			default: "#303030",
			paper: "#373636",
		},
		divider: "rgba(255, 255, 255, 0.10)",
	},
})