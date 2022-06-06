import { Autocomplete, Divider, Grid, TextField } from "@mui/material"
import React, { ReactElement, SyntheticEvent, useContext, useEffect, useState } from "react"
import ReactAwesomeTypography from "react-awesome-typography"
import GoogleFontLoader from "react-google-font-loader"

import SettingsContext from "../../context/Setttings"
import { cn } from "../../helper"
import "./AwtWrapper.scss"
import Kerning from "./examples/Kerning/Kerning"
import Poem from "./examples/Poem/Poem"


function ExampleComponent () {
	console.log("ExampleComponent", "render")

	const [ state, setState ] = useState(false)

	useEffect(() => {
		setTimeout(() => {
			setState(!state)
		}, 3000)
	}, [ state ])

	return (
		<button>
			Hello, World! { state && <span>Awesome ............ !</span> }
		</button>
	)
}

const exampleOptions: Record<string, () => ReactElement> = {
	"Poem": Poem,
	"Kerning": Kerning,
}

const autoCompleteOptions = Object.keys(exampleOptions)

export default function AwesomeWrapper<FC> () {
	const [ settings ] = useContext(SettingsContext)
	const [ exampleTextValue, setExample ] = useState(autoCompleteOptions[0])
	const Example = exampleOptions[exampleTextValue]

	const {
		awtProps,
		font: {
			family,
			fontVariants,
		},
	} = settings

	const handleExampleChange = (event: SyntheticEvent, newValue: string | null) => {
		if (newValue) {
			setExample(newValue)
		} else {
			console.error("Example empty", newValue)
		}
	}

	return (
		<Grid
			item
			xs={ 8 }
			maxHeight={ "100vh" }
			overflow={ "scroll" }
			className={ "awt-view" }
			sx={ {
				background: "#FFF1EA",
				color: "#3E1600",
				borderLeft: "inset 1px solid rgba(255,255,255,0.1)",
			} }
		>
			<Grid
				item
				xs={ 8 }
				margin={ "1rem auto" }
				sx={ {
					fontFamily: family,
				} }
			>
				{ Boolean(fontVariants.length) &&
					<GoogleFontLoader
						fonts={ [ {
							font: family,
							weights: fontVariants,
						} ] }
					/>
				}

				<Autocomplete
					renderInput={ (params) =>
						<TextField
							{ ...params }
							label={ "Text Example" }
						/>
					}
					onChange={ handleExampleChange }
					value={ exampleTextValue }
					options={ autoCompleteOptions }
				/>

				<Divider sx={ { margin: "2rem 0" } } />

				<div
					className={ cn(
						"awt-container",
						awtProps.debug && "debug-active",
					) }
				>
					<ReactAwesomeTypography { ...awtProps }>
						<Example />
					</ReactAwesomeTypography>
				</div>
			</Grid>
		</Grid>
	)
}