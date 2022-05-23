import { DataGrid } from "@mui/x-data-grid"
import * as React from "react"
import { useContext } from "react"
import { AlignmentRule } from "react-awesome-typography/lib/types"
import SettingsContext from "../../context/Setttings"
import { columns } from "./Columns"


function getRuleIndex (rules: AlignmentRule[], id: string): number | null {
	for (let i = 0; i < rules.length; i++) {
		if (rules[i].id === id) {
			return i
		}
	}

	return null
}

export default function SettingsGrid () {
	const [ settings, setSettings ] = useContext(SettingsContext)
	const { awtProps: { opticalAlignmentRules } } = settings
	const rules = opticalAlignmentRules || []

	return (
		<div style={ { height: 400, width: "100%" } }>
			<DataGrid
				rows={ rules }
				columns={ columns }
				// pageSize={ 5 }
				// rowsPerPageOptions={ [ 5 ] }
				editMode={ "cell" }
				disableSelectionOnClick
				experimentalFeatures={ { newEditingApi: true } }
				onCellEditStop={ (params) => {
					const index = getRuleIndex(rules, params.row.id)

					if (index !== null && rules[index]) {
						const newRules = [ ...rules ]
						// @ts-ignore
						// newRules[index][params.field] = params.row[params.field]
						newRules[index].offset = -10

						// @ts-ignore
						console.log(newRules[index])

						const newSettings = { ...settings }
						newSettings.awtProps.opticalAlignmentRules = newRules
						setSettings(newSettings)
						console.log("SET", newSettings, params)
					}

					console.log("DONE EDITING", index)
				} }
			/>
		</div>
	)
}
