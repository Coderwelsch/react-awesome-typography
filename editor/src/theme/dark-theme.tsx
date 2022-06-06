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

export const defaultFontFamily: string = [
	"Georgia",
].join(", ")

export const darkTheme = createTheme({
	typography: {
		fontFamily: defaultFontFamily,
		fontSize: 16,
		button: {
			fontFamily: UiFont,
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
		MuiGrid: {
			defaultProps: {
				sx: {},
			},
		},
		MuiAutocomplete: {
			defaultProps: {
				sx: {
					"input::placeholder": {
						fontFamily: UiFont,
					},
				},
			},
		},
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

export const lightTheme = createTheme({
	palette: {
		mode: "light",
		text: {
			primary: "#45331a",
		},
		divider: "rgba(0, 0, 0, 1)",
	},
	typography: {
		fontFamily: defaultFontFamily,
		fontSize: 16,
		button: {
			fontFamily: UiFont,
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
				// sx: {
				// 	// color: "rgba(0, 0, 0, 0.8)",
				// 	fontSize: "0.65rem",
				// 	letterSpacing: "0.03rem",
				// 	textTransform: "uppercase",
				// },
			},
		},
	},
})