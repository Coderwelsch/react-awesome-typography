import { FindReplaceTwoTone, ReadMore } from "@mui/icons-material"
import { Autocomplete, Button, ButtonGroup, ButtonProps, Divider, Grid, TextField, Typography } from "@mui/material"
import React, { ReactElement, ReactNode, SyntheticEvent, useContext, useEffect, useRef, useState } from "react"
import ReactAwesomeTypography from "react-awesome-typography"
import GoogleFontLoader from "react-google-font-loader"
import GrammarRulesOverlayContext, { GrammarRulesOverlayContextProps, INITIAL_SETTINGS_CONTEXT } from "../../context/GrammarRuleOverlay"

import SettingsContext from "../../context/Setttings"
import { cn } from "../../helper"
import { GrammarRuleCreateOverlay } from "../GrammarRuleCreateOverlay/GrammarRuleCreateOverlay"
import Popover from "../Popover/Popover"
import "./AwtWrapper.scss"
import Kerning from "./examples/Kerning/Kerning"
import Poem from "./examples/Poem/Poem"


export interface TextSelectionPopoverProps {
	text: string
}


export interface PopupButtonProps extends ButtonProps {
	text: string,
	icon: ReactNode
}


function PopupButton ({ text, icon, ...props }: PopupButtonProps) {
	return <Button
		startIcon={ icon }
		sx={ {
			padding: "0.5rem 1rem",
			marginLeft: "0rem !important",
		} }
		{ ...props }
	>
		{ text }
	</Button>
}

export function TextSelectionPopover ({ text }: TextSelectionPopoverProps) {
	const [ settings, setSettings ] = useContext(GrammarRulesOverlayContext)

	return (
		<ButtonGroup
			color="primary"
			style={ {
				whiteSpace: "nowrap",
			} }
			size={ "small" }
			variant={ "text" }
			aria-label="text button group"
		>
			<PopupButton
				text={ "Replace with …" }
				icon={ <FindReplaceTwoTone /> }
				onClick={ () => setSettings({
					...settings,
					opened: true,
					text,
				}) }
			/>

			<PopupButton
				text={ "Optical align …" }
				icon={ <ReadMore /> }
			/>
		</ButtonGroup>
	)
}

const exampleOptions: Record<string, () => ReactElement> = {
	"Poem": Poem,
	"Kerning": Kerning,
}

const autoCompleteOptions = Object.keys(exampleOptions)

export default function AwesomeWrapper () {
	const [ settings, setSettings ] = useContext(SettingsContext)
	const scrollContainer = useRef<HTMLDivElement>(null)
	const [ exampleTextValue, setExample ] = useState(autoCompleteOptions[0])
	const [ grammarRulesOverlay, setGrammarRulesOverlay ] = useState<GrammarRulesOverlayContextProps>(INITIAL_SETTINGS_CONTEXT)

	const Example = exampleOptions[exampleTextValue]

	const {
		awtProps,
		font: {
			family,
			fontVariants,
		},
	} = settings

	const handleTextSelection = (event: Event) => {
		const selection = window.getSelection()
		const text = selection?.toString() || ""
		const currentText = settings.textSelection?.selection
		const isChildOfAwtContainer = selection?.anchorNode?.parentElement?.closest(".awt-container")

		if (!isChildOfAwtContainer) {
			return
		}

		if (!text) {
			setSettings({
				...settings,
				textSelection: null,
				popover: null,
			})

			// console.log("CANCEL", text, isChildOfAwtContainer)

			return
		}

		const range = selection!.getRangeAt(0)
		const rect = range.getBoundingClientRect()
		let tooltipOffsetTop = 0

		if (scrollContainer.current) {
			tooltipOffsetTop = scrollContainer.current.scrollTop
		}

		setSettings({
			...settings,
			popover: {
				center: [
					rect.left + rect.width / 2,
					rect.top + tooltipOffsetTop,
				],
				children: (
					<TextSelectionPopover
						text={ text.substring(0, 24) }
					/>
				),
			},
			textSelection: {
				selection: text || "",
				boundingBox: rect,
			},
		})
	}

	const removeEventListeners = () => {
		console.log("REMOVE")
		document.removeEventListener("mouseover", handleMouseOver)
		document.removeEventListener("selectionchange", handleTextSelection)
	}

	const addEventListeners = () => {
		console.log("ADD")
		document.addEventListener("selectionchange", handleTextSelection)
		document.addEventListener("mouseover", handleMouseOver)
	}

	const handleMouseOver = (event: Event) => {
		// console.log(settings.textSelection?.selection)
		return false

		if (settings.textSelection?.selection) {
			return
		}

		if (!event.target) {
			return
		}

		const elem = event.target as HTMLElement

		if (elem.closest(".MuiTooltip-popper")) {
			return
		}

		const oaRuleId = elem.getAttribute("data-oa-rule")

		if (!oaRuleId) {
			setSettings({
				...settings,
				popover: null,
			})

			return
		}

		const { top, left, width, height } = elem.getBoundingClientRect()

		setSettings({
			...settings,
			popover: {
				center: [
					left + width / 2,
					top + height / 2,
				],
				children: (
					<Typography>OA Rule «{ oaRuleId }»</Typography>
				),
			},
		})
	}

	useEffect(() => {
		addEventListeners()

		return () => {
			removeEventListeners()
		}
	}, [])

	const handleExampleChange = (event: SyntheticEvent, newValue: string | null) => {
		if (newValue) {
			setExample(newValue)
		} else {
			console.error("Example not found", newValue)
		}
	}

	console.log("RENDER", settings.popover)

	return (
		<GrammarRulesOverlayContext.Provider
			value={ [ grammarRulesOverlay, setGrammarRulesOverlay ] }
		>
			<Grid
				item
				xs={ 8 }
				maxHeight={ "100vh" }
				overflow={ "scroll" }
				className={ "awt-view" }
				ref={ scrollContainer }
				sx={ {
					position: "relative",
					color: "#3E1600",
					borderLeft: "inset 1px solid rgba(255,255,255,0.1)",
					background: "#FFF1EA",
				} }
			>
				{ settings.popover?.children &&
					<Popover />
				}

				<GrammarRuleCreateOverlay />

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
							"awt-container rawt-container",
							awtProps.debug && "debug-active",
						) }
					>
						<ReactAwesomeTypography { ...awtProps }>
							<Example />
						</ReactAwesomeTypography>
					</div>
				</Grid>
			</Grid>
		</GrammarRulesOverlayContext.Provider>
	)
}