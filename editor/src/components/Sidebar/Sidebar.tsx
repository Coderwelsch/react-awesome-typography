import { Autocomplete, Grid, List, Paper, Stack, TextField } from "@mui/material"
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
		} }
	>
		<img src={ TeaserSrc } alt={ "Awesome Typography – The Config Editor" } />
	</Paper>

export function Sidebar<FC> () {
	const [ settings, setSettings ] = useContext(SettingsContext)
	const [ googleFonts, setGoogleFonts ] = useState([
		{
			family: settings.font.family,
			variants: settings.font.fontVariants,
		},
	])
	const [ dropdownOptions, setDropdownOptions ] = useState<string[]>([ settings.font.family ])

	const loadFonts = async () => {
		const result = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${ process.env.REACT_APP_GOOGLE_API_KEY }`, {})
		const data = await result.json()
		const sanitizedResult = data.items.map((font: any) => {
			return {
				family: font.family,
				variants: font.variants,
			}
		})

		setGoogleFonts([
			{
				label: settings.font.family,
				variants: settings.font.fontVariants,
			},
			...sanitizedResult,
		])

		setDropdownOptions([
			settings.font.family,
			...data.items.map((font: any) => font.family),
		])
	}

	useEffect(() => {
		loadFonts().catch((e) => {
			console.error("Error loading google fonts list", e)
		})
	}, [])

	function handleFontChange (event: SyntheticEvent, newValue: string | null) {
		if (!newValue) {
			return
		}

		const font = googleFonts.find((elem) =>
			elem.family === newValue,
		)

		setSettings({
			...settings,
			font: {
				...settings.font,
				family: newValue,
				fontVariants: font?.variants || [],
			},
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
					<List>
						<SettingListElement
							property={ "enabled" }
							label={ "Enable RAWT" }
						/>

						<SettingListElement
							property={ "debug" }
							label={ "Debug Mode" }
						/>

						<SettingListElement
							property={ "enableOrphanPrevention" }
							label={ "Orphan Prevention" }
							isLast={ true }
						/>
					</List>
				</SettingsSection>

				<SettingsSection title={ "Styles" }>
					<Autocomplete
						disablePortal
						id="combo-box"
						options={ dropdownOptions }
						value={ settings.font.family }
						fullWidth={ true }
						sx={ { fontFamily: "monospace" } }
						// @ts-ignore
						onChange={ handleFontChange }
						renderInput={ (params) =>
							<TextField
								{ ...params }
								label={ "Font Family" }
							/>
						}
					/>
				</SettingsSection>

				<SettingsSection title={ "Grammar Correction" }>
					<Paper
						sx={ {
							borderRadius: "0.5rem",
							backgroundColor: "rgba(255, 255, 255, 0.1)",
						} }
					>
						<GrammarSettings />
					</Paper>
				</SettingsSection>

				<SettingsSection title={ "Optical Alignment" }>
					<Paper
						sx={ {
							borderRadius: "0.5rem",
							backgroundColor: "rgba(255, 255, 255, 0.1)",
						} }
					>
						<OASettings />
					</Paper>
				</SettingsSection>

			</Stack>
		</Grid>
	)
}