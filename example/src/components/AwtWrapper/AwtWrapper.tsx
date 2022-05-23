import { Grid } from "@mui/material"
import React, { useContext } from "react"
import ReactAwesomeTypography from "react-awesome-typography"

import { cn } from "../../App"
import SettingsContext from "../../context/Setttings"


export default function AwesomeWrapper<FC> () {
	const [ settings, setSettings ] = useContext(SettingsContext)
	const { awtProps } = settings

	return (
		<Grid
			item
			xs={ 8 }
		>
			<Grid
				item
				xs={ 8 }
				margin={ "1rem auto" }
				className={ cn(
					"container",
					awtProps.debug && "debug-active",
				) }
			>
				<ReactAwesomeTypography { ...awtProps }>
					<h1>
						Web typo&shy;graphy on steroids ....... !
					</h1>

					<p>
						"This react component transforms your copy text into awesome text,
						everyone wants to read ................. "
						<br />
						<br />
						<i>You can define your own rules to optical align words (on left text column side),</i> fix misspellings and typographical issues like
						wrong
						typed ellipses: ..............................
					</p>
				</ReactAwesomeTypography>
			</Grid>
		</Grid>
	)
}