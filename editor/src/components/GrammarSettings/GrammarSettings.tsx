import { AddCircle } from "@mui/icons-material"
import { Button, Grid, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import * as React from "react"
import { useContext } from "react"
import { GrammarRule } from "react-awesome-typography/dist/types"

import SettingsContext, { SettingsContextProps } from "../../context/Setttings"
import { sanitizeRegExp } from "../../helper"


interface UseInputChangeParams {
	settings: SettingsContextProps
	setSettings: (state: SettingsContextProps) => void
}


function useInputChange ({
	settings,
	setSettings,
}: UseInputChangeParams) {
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
		const newSettings = { ...settings }
		const value = event.target.value

		if (
			!newSettings?.awtProps?.grammarRules ||
			!newSettings?.awtProps?.grammarRules[index]
		) {
			console.error(`Rule not found`, index, newSettings?.awtProps?.grammarRules)
			return
		}

		const newRule = newSettings.awtProps.grammarRules[index] as GrammarRule
		const ruleName = event.currentTarget.name as keyof GrammarRule

		let newValue: string | RegExp = value

		if (event.currentTarget.name === "test") {
			try {
				newValue = new RegExp(value)
				newRule.test = newValue
			} catch (e) {
				console.log(e)
			}
		} else {
			newRule[ruleName] = newValue
		}

		setSettings(newSettings)
	}

	return [ handleInputChange ]
}

function Row ({ rule, index }: { rule: GrammarRule, index: number }) {
	const [ settings, setSettings ] = useContext(SettingsContext)

	const [ handleInputChange ] = useInputChange({ settings, setSettings })

	const sanitizedTest = sanitizeRegExp(rule.test)

	return (
		<TableRow
			sx={ {
				"&:last-child td, &:last-child th": { border: 0 },
				"&:hover": {
					backgroundColor: "rgba(255, 255, 255, 0.1)",
				},
			} }
		>
			<TableCell
				align="right"
				sx={ {
					fontFamily: "monospace",
					fontSize: "0.9rem",
				} }
			>
				<Input
					size={ "small" }
					name={ "test" }
					defaultValue={ sanitizedTest }
					onChange={ (event) => handleInputChange(event, index) }
				/>
			</TableCell>

			<TableCell
				align="right"
				sx={ {
					fontFamily: "monospace",
				} }
			>
				<Input
					size={ "small" }
					name={ "replace" }
					value={ rule.replace }
					onChange={ (event) => handleInputChange(event, index) }
				/>
			</TableCell>
		</TableRow>
	)
}

export default function GrammarSettings () {
	const [ settings ] = useContext(SettingsContext)
	const { awtProps: { grammarRules = [] } } = settings

	return (
		<>
			<TableContainer>
				<Table
					sx={ { width: "100%" } }
					aria-label="simple table"
				>
					<TableHead sx={ { position: "sticky", top: 0 } }>
						<TableRow
							sx={ {
								"th": { fontWeight: "bold" },
							} }
						>
							<TableCell
								align="left"
							>
								Regex
							</TableCell>

							<TableCell
								align="left"
								sx={ { minWidth: "8rem" } }
							>
								Replacement
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ grammarRules.map((rule, index) => (
							<Row
								rule={ rule }
								index={ index }
								key={ index }
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
