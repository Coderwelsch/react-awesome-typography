import { CssBaseline, Grid, ThemeProvider } from "@mui/material"
import React, { useState } from "react"

import "./App.scss"

import AwesomeWrapper from "./components/AwtWrapper/AwtWrapper"
import { Sidebar } from "./components/Sidebar/Sidebar"
import SettingsContext, { INITIAL_SETTINGS_CONTEXT, SettingsContextProps } from "./context/Setttings"
import { darkTheme } from "./theme/dark-theme"


function App () {
	const [
		settingsState,
		setSettings,
	] = useState<SettingsContextProps>(INITIAL_SETTINGS_CONTEXT)

	return (
		<ThemeProvider
			theme={ darkTheme }
		>
			<CssBaseline />

			<SettingsContext.Provider
				value={ [ settingsState, setSettings ] }
			>

				<Grid
					container
					spacing={ 2 }
				>
					<AwesomeWrapper />
					<Sidebar />
				</Grid>

			</SettingsContext.Provider>

		</ThemeProvider>
	)
}

export default App
