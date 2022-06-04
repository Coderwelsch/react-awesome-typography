import { Autocomplete, Grid, Paper, Stack, TextField } from "@mui/material"
import React, { SyntheticEvent, useContext, useEffect, useState } from "react"

import TeaserSrc from "../../assets/logo/editor/dark.svg"
import SettingsContext from "../../context/Setttings"
import GrammarSettings from "../GrammarSettings/GrammarSettings"
import OASettings from "../OASettings/OASettings"
import { SettingListElement } from "./ListElement"
import { SettingsSection } from "./Section"


export const Teaser = () =>
	<Paper
		sx={ {
			p: 4,
			pl: 4,
			pb: 3,
			borderRadius: 0,
			borderBottom: "1px solid rgba(255,255,255,0.1)",
			position: "sticky",
			top: 0,
			zIndex: 2,
		} }
	>
		<img src={ TeaserSrc } alt={ "Awesome Typography – The Config Editor" } />
	</Paper>

export function Sidebar<FC> () {
	const [ settings, setSettings ] = useContext(SettingsContext)
	const [ fontOptions, setFontOptions ] = useState([
		settings.fontFamily,
	])

	const loadFonts = async () => {
		const result = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${ process.env.REACT_APP_GOOGLE_API_KEY }`, {})
		const data = await result.json()

		setFontOptions([
			settings.fontFamily,
			...data.items.map((family: any) => family.family),
		])
	}

	useEffect(() => {
		loadFonts()
	}, [])

	function handleFontChange (event: SyntheticEvent, newValue: string | null) {
		if (!newValue) {
			return
		}

		setSettings({
			...settings,
			fontFamily: newValue,
		})
	}

	return (
		<Grid
			item
			xs={ 4 }
			m={ 0 }
			className={ "sidebar" }
		>
			<Teaser />

			<Stack>
				<SettingsSection title={ "Base Options" }>
					<SettingListElement
						property={ "enabled" }
						label={ "Enable RAWT" }
					/>

					<SettingListElement
						property={ "debug" }
						label={ "Debug Mode" }
						isLast={ true }
					/>
				</SettingsSection>

				<SettingsSection title={ "Styles" }>
					<Autocomplete
						disablePortal
						id="combo-box-demo"
						options={ fontOptions }
						value={ settings.fontFamily }
						fullWidth={ true }
						sx={ { fontFamily: "monospace" } }
						// @ts-ignore
						onChange={ handleFontChange }
						renderInput={ (params) =>
							<TextField
								{ ...params }
								label="Font Family"
							/>
						}
					/>
				</SettingsSection>

				<SettingsSection title={ "Grammar Correction" }>
					<GrammarSettings />
				</SettingsSection>

				<SettingsSection title={ "Optical Alignment" }>
					<OASettings />
				</SettingsSection>

			</Stack>
		</Grid>
	)
}