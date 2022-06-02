import { Autocomplete, Grid, Paper, Stack, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import TeaserSrc from "../../assets/logo-teaser.svg"
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
	const [ fontOptions, setFontOptions ] = useState([
		{ label: "Waiting …" },
	])

	const loadFonts = async () => {
		const result = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${ process.env.REACT_APP_GOOGLE_API_KEY }`, {})
		const data = await result.json()

		console.log(data.items)

		setFontOptions(data.items.map((family: any) => ({
			label: family.family,
		})))
	}

	useEffect(() => {
		loadFonts()
	}, [])

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
						fullWidth={ true }
						sx={ { fontFamily: "monospace" } }
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