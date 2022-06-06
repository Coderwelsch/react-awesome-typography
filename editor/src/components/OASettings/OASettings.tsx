import { AddCircle } from "@mui/icons-material"
import { Button, Grid, Input, Slider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import * as React from "react"
import { useContext } from "react"

import { AlignmentRule } from "react-awesome-typography/dist/types"
import SettingsContext from "../../context/Setttings"
import { sanitizeRegExp } from "../../helper"


export function getRuleIndex (rules: AlignmentRule[], id: string): number | null {
	for (let i = 0; i < rules.length; i++) {
		if (rules[i].id === id) {
			return i
		}
	}

	return null
}

function Row ({ rule, index }: { rule: AlignmentRule, index: number }) {
	const [ settings, setSettings ] = useContext(SettingsContext)

	const handleInputChange = (field: string, index: number, value: string | number) => {
		const newSettings = { ...settings }
		const rules = newSettings?.awtProps?.opticalAlignmentRules

		if (!rules || rules && !rules[index]) {
			return
		}

		let _value = value

		if (field === "test") {
			try {
				rules[index].test = new RegExp(_value as string)
			} catch (e) {
			}
		} else if (field === "offset") {
			rules![index][field] = Number.parseFloat(_value as string)
		} else {
			// @ts-ignore
			rules![index][field] = _value
		}

		setSettings(newSettings)
	}

	return (
		<TableRow
			sx={ {
				"&:last-child td, &:last-child th": { border: 0 },
				"&:hover": {
					backgroundColor: "rgba(255, 255, 255, 0.1)",
				},
			} }
		>
			<TableCell sx={ { maxWidth: "4rem" } }>
				<Input
					defaultValue={ rule.id }
					name={ "id" }
					onChange={ ({ currentTarget }) => handleInputChange(currentTarget.name, index, currentTarget.value) }
				/>
			</TableCell>

			<TableCell
				align="right"
				sx={ {
					maxWidth: "2rem",
					fontFamily: "monospace",
					fontSize: "0.9rem",
				} }
			>
				<Input
					defaultValue={ sanitizeRegExp(rule.test) }
					name={ "test" }
					onChange={ ({ currentTarget }) => handleInputChange(currentTarget.name, index, currentTarget.value) }
				/>
			</TableCell>

			<TableCell
				align="right"
				sx={ {
					fontFamily: "monospace",
				} }
			>
				<Stack
					direction={ "row" }
					spacing={ 2 }
					padding={ 1 }
				>
					<Slider
						value={ rule.offset }
						onChange={ (event, value) =>
							handleInputChange("offset", index, Array.isArray(value) ? value[0] : value)
						}
						valueLabelDisplay={ "auto" }
						step={ 0.01 }
						min={ -1.5 }
						max={ 0.5 }
					/>

					{/*<Input*/ }
					{/*	size={ "small" }*/ }
					{/*	value={ rule.offset }*/ }
					{/*	name={ "offset" }*/ }
					{/*	sx={ {*/ }
					{/*		maxWidth: "3.75rem",*/ }
					{/*		"input": {*/ }
					{/*			textAlign: "right"*/ }
					{/*		}*/ }
					{/*	} }*/ }
					{/*	inputProps={ {*/ }
					{/*		step: 0.01,*/ }
					{/*		min: -2,*/ }
					{/*		max: 1,*/ }
					{/*		type: "number",*/ }
					{/*		"aria-labelledby": "input-slider",*/ }
					{/*	} }*/ }
					{/*	onChange={ ({ currentTarget }) => handleInputChange(currentTarget.name, index, currentTarget.value) }*/ }
					{/*/>*/ }
				</Stack>
			</TableCell>
		</TableRow>
	)
}

export default function OASettings () {
	const [ settings ] = useContext(SettingsContext)
	const { awtProps: { opticalAlignmentRules } } = settings

	return (
		<>
			<TableContainer>
				<Table sx={ { width: "100%" } } aria-label="simple table">
					<TableHead sx={ { position: "sticky", top: 0 } }>
						<TableRow sx={ { "th": { fontWeight: "bold" } } }>
							<TableCell>ID</TableCell>
							<TableCell align="left">Regex</TableCell>
							<TableCell align="left" sx={ { minWidth: "8rem" } }>Offset</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ (opticalAlignmentRules || []).map((rule, index) => (
							<Row
								rule={ rule }
								index={ index }
								key={ rule.id }
							/>
						)) }
					</TableBody>
				</Table>
			</TableContainer>

			<Grid
				container
				sx={ { justifyContent: "center" } }
				margin={ "0.25rem 0" }
				marginBottom={ "0.75rem" }
			>
				<Button startIcon={ <AddCircle /> }>
					Add Rule
				</Button>
			</Grid>
		</>
	)
}
