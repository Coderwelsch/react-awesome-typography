import { createTheme } from "@mui/material"
import { defaultFontFamily, UiFont } from "./dark"


export const lightTheme = createTheme({
	palette: {
		mode: "light",
		text: {
			primary: "#45331a",
		},
		primary: {
			main: "#ff914e",
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
		MuiDialogTitle: {
			defaultProps: {
				sx: {
					fontFamily: UiFont,
				},
			},
		},
	},
})