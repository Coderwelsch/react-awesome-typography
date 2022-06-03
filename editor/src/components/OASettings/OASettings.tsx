import { Input, Slider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import * as React from "react"
import { useContext } from "react"

import { AlignmentRule } from "react-awesome-typography/dist/types"
import SettingsContext from "../../context/Setttings"


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

	const handleChange = (index: number, event: Event, value: number | number[]) => {
		const newSettings = { ...settings }

		if (newSettings?.awtProps?.opticalAlignmentRules && !newSettings?.awtProps?.opticalAlignmentRules[index]) {
			return
		}

		newSettings.awtProps.opticalAlignmentRules![index].offset = typeof value !== "number" ? value[0] : value
		setSettings(newSettings)
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
		const newSettings = { ...settings }

		if (newSettings?.awtProps?.opticalAlignmentRules && !newSettings?.awtProps?.opticalAlignmentRules[index]) {
			return
		}

		newSettings.awtProps.opticalAlignmentRules![index].offset = event.target.value === "" ? 0 : Number(event.target.value)
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
			<TableCell>
				{ rule.id }
			</TableCell>

			<TableCell
				align="right"
				sx={ {
					maxWidth: "2rem",
					fontFamily: "monospace",
					fontSize: "0.9rem",
				} }
			>
				{ rule.test.toString() }
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
				>
					<Slider
						value={ rule.offset }
						onChange={ (event, value) =>
							handleChange(index, event, value)
						}
						valueLabelDisplay={ "auto" }
						step={ 0.01 }
						min={ -2 }
						max={ 1 }
					/>

					<Input
						size={ "small" }
						value={ rule.offset }
						sx={ {
							maxWidth: "3.75rem",
						} }
						inputProps={ {
							step: 0.01,
							min: -2,
							max: 1,
							type: "number",
							"aria-labelledby": "input-slider",
						} }
						onChange={ (event) => handleInputChange(event, index) }
					/>
				</Stack>
			</TableCell>
		</TableRow>
	)
}

export default function OASettings () {
	const [ settings ] = useContext(SettingsContext)
	const { awtProps: { opticalAlignmentRules } } = settings

	return (
		<TableContainer>
			<Table sx={ { width: "100%" } } aria-label="simple table">
				<TableHead>
					<TableRow sx={ { "th": { fontWeight: "bold" } } }>
						<TableCell>ID</TableCell>
						<TableCell align="right">Regex</TableCell>
						<TableCell align="right" sx={ { minWidth: "8rem" } }>Offset</TableCell>
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
	)
}
