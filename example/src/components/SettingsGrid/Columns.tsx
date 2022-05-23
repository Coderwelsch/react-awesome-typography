import { GridColDef, GridValueGetterParams, GridValueSetterParams } from "@mui/x-data-grid"


export const columns: GridColDef[] = [
	{
		field: "id",
		headerName: "Name",
		editable: true,
	},
	{
		field: "test",
		headerName: "RegExp",
		type: "string",
		width: 150,
		editable: true,
		valueGetter: (params: GridValueGetterParams) => {
			return params.value.toString().replace(/(^\/)|(\/$)/g, "")
		},
		valueSetter: (params: GridValueSetterParams) => {
			try {
				const test = new RegExp(params.value)

				return {
					...params.row,
					test,
				}
			} catch (e) {
				console.error(e)
			}

			return params.row
		},
	},
	{
		field: "offset",
		headerName: "Offset",
		type: "number",
		width: 120,
		editable: true,
	},
]