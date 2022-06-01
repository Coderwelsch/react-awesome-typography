import { Checkbox, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import React, { ReactNode, useContext } from "react"
import { AwesomeTypographyProps } from "../../../../lib/types"
import SettingsContext from "../../context/Setttings"


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
	isLast,
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
				sx={ {
					background: (theme) => theme.palette.background.paper,
					borderRadius: "0.5rem",
					mb: isLast ? 0 : 2
				} }
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
					sx={ {
						pl: 3,
						pt: 1,
						pr: 4,
						pb: 1,
					} }
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