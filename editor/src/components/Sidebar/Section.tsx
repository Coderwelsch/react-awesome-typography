import { List, Stack, Typography } from "@mui/material"
import React, { FC, ReactNode } from "react"


export interface SettingsSectionProps {
	title: string,
	children: ReactNode
}


export const SettingsSection: FC<SettingsSectionProps> = ({
	title,
	children,
}) => {
	return (
		<Stack
			spacing={ 2 }
			sx={ {
				borderBottom: "1px solid rgba(255,255,255,0.1)",
				p: 4, pl: 4
			} }
		>
			<Typography
				textTransform={ "uppercase" }
				fontFamily={ "monospace" }
				fontSize={ "0.8rem" }
				letterSpacing={ "0.03rem" }
				color={ "rgba(255,255, 255, 0.5)" }
			>
				{ title }
			</Typography>

			<List>
				{ children }
			</List>
		</Stack>
	)
}