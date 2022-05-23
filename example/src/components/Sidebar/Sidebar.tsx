import { FlashlightOnTwoTone, PlayCircle } from "@mui/icons-material"
import { Box, Checkbox, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material"
import React, { ReactNode, useContext } from "react"
import { AwesomeTypographyProps } from "react-awesome-typography/lib/types"

import SettingsContext from "../../context/Setttings"
import SettingsGrid from "../SettingsGrid/SettingsGrid"


export interface SettingListElementProps {
	property: keyof AwesomeTypographyProps,
	label: string,
	icon?: ReactNode,
	isLast?: boolean
}


export function SettingListElement ({
	property,
	label,
	icon,
	isLast
}: SettingListElementProps) {
	const [ settings, setSettings ] = useContext(SettingsContext)
	const { enabled } = settings.awtProps
	const isDisabled = property === "enabled" ? false : !enabled

	const value = settings.awtProps[property]

	if (property === null || property === undefined) {
		return null
	}

	const _setSetting = (key: keyof AwesomeTypographyProps, value: any) => {
		const newSettings = { ...settings }

		if (newSettings.awtProps[key] !== undefined) {
			newSettings.awtProps[key] = value
		}

		setSettings(newSettings)
	}

	const handleChange = () => {
		_setSetting(property, !value)
		_setSetting(property, !value)
	}

	return (
		<>
			<ListItem
				disablePadding
				secondaryAction={
					<Checkbox
						edge={ "start" }
						checked={ !!value }
						onChange={ handleChange }
						disabled={ isDisabled }
						tabIndex={ -1 }
						inputProps={ { "aria-labelledby": property.toString() } }
					/>
				}
			>
				<ListItemButton
					role={ undefined }
					disabled={ isDisabled }
					onClick={ handleChange }
					dense
				>
					{ icon &&
						<ListItemIcon>
							{ icon }
						</ListItemIcon>
					}

					<ListItemText
						id={ property }
						primary={ label }
					/>
				</ListItemButton>
			</ListItem>

			{ !isLast &&
				<Divider />
			}
		</>
	)
}

export function Sidebar<FC> () {
	return (
		<Grid
			item
			xs={ 4 }
			sx={ {
				backgroundColor: "#243843",
			} }
			className={ "sidebar" }
		>
			<Stack spacing={ 6 } m={ 3 } mt={ 5 }>
				<Stack spacing={ 2 }>
					<Divider>Base Options</Divider>

					<List>
						<SettingListElement
							property={ "enabled" }
							label={ "Enable RAWT" }
							icon={ <PlayCircle fontSize={ "small" } /> }
						/>

						<SettingListElement
							property={ "debug" }
							label={ "Debug Mode" }
							icon={ <FlashlightOnTwoTone fontSize={ "small" } /> }
							isLast={ true }
						/>
					</List>
				</Stack>

				<Box m={ 2 }>
					<Stack spacing={ 3 }>
						<Divider>Optical Alignment</Divider>
						<SettingsGrid/>
					</Stack>
				</Box>

			</Stack>
		</Grid>
	)
}