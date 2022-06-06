import React, { useContext } from "react"

import AwesomeTypographyContext from "../../context/AwesomeTypographyContext"


export interface KerningProps {
	text: string
}


export default function (props: KerningProps) {
	const context = useContext(AwesomeTypographyContext)

	return (
		props.text
	)
}