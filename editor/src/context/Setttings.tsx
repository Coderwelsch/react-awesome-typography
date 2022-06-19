import { TooltipProps } from "@mui/material"
import React, { ReactNode } from "react"

import defaultRules from "react-awesome-typography/dist/lib/grammar/rules"
import en_EN from "react-awesome-typography/dist/lib/grammar/rules/en_EN"
import { combineRules } from "react-awesome-typography/dist/lib/grammar/rules/helper"
import alignmentRules from "react-awesome-typography/dist/lib/optical-alignment/rules"

import { AwesomeTypographyProps } from "react-awesome-typography/dist/types"


export interface FontOptions {
	family: string,
	fontVariants: string[]
	letterSpacing: string
	lineHeight: string | number
}


export interface TextSelectionProps {
	boundingBox: DOMRect,
	selection: string,
}


export interface SettingsContextProps {
	awtProps: AwesomeTypographyProps,
	font: FontOptions,
	popover?: null | {
		children: ReactNode,
		center: [ number, number ],
		popoverProps?: Partial<TooltipProps>
	},
	textSelection?: null | TextSelectionProps
}


export const INITIAL_SETTINGS_CONTEXT: SettingsContextProps = {
	awtProps: {
		enabled: true,
		debug: true,
		enableOpticalAlignment: true,
		enableOrphanPrevention: true,
		opticalAlignmentRules: alignmentRules,
		grammarRules: combineRules(defaultRules, en_EN),
	},
	font: {
		family: "Georgia",
		letterSpacing: "0.01rem",
		lineHeight: "1.2rem",
		fontVariants: [],
	},
	textSelection: null,
}

console.log("INITIAL_SETTINGS_CONTEXT", INITIAL_SETTINGS_CONTEXT)

const SettingsContext = React.createContext<[
	SettingsContextProps,
	(state: SettingsContextProps) => void
]>([
	INITIAL_SETTINGS_CONTEXT,
	() => null,
])

export default SettingsContext