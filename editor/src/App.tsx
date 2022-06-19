import { CssBaseline, Grid, ThemeProvider } from "@mui/material"
import React, { useState } from "react"

import "./App.scss"

import AwesomeWrapper from "./components/AwtWrapper/AwtWrapper"
import { Sidebar } from "./components/Sidebar/Sidebar"
import SettingsContext, { INITIAL_SETTINGS_CONTEXT, SettingsContextProps } from "./context/Setttings"
import { dark } from "./theme/dark"
import { lightTheme } from "./theme/light"


function App () {
	const [
		settingsState,
		setSettings,
	] = useState<SettingsContextProps>(INITIAL_SETTINGS_CONTEXT)

	return (
		<>
			<SettingsContext.Provider
				value={ [ settingsState, setSettings ] }
			>
				<Grid
					container
					spacing={ 2 }
				>
					<ThemeProvider theme={ lightTheme }>
						<AwesomeWrapper />
						<CssBaseline />
					</ThemeProvider>

					<ThemeProvider theme={ dark }>
						<Sidebar />
						<CssBaseline />
					</ThemeProvider>
				</Grid>

			</SettingsContext.Provider>

		</>
	)
}

export default App
