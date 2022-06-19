import { FindReplaceRounded } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextareaAutosize, TextField, Typography } from "@mui/material"
import React, { FormEvent, KeyboardEventHandler, useContext, useRef } from "react"

import GrammarRulesOverlayContext from "../../context/GrammarRuleOverlay"


export interface GrammarRuleCreateOverlayProps {
	onClose?: () => void
}


export function GrammarRuleCreateOverlay ({ onClose }: GrammarRuleCreateOverlayProps) {
	const formRef = useRef<HTMLFormElement>(null)
	const [ settings, setSettings ] = useContext(GrammarRulesOverlayContext)

	// useEffect(() => {
	// 	if (settings.opened) {
	// 		unselect()
	// 	}
	// }, [])

	function handleSubmit (event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		console.log(event)
		return false
	}

	function handleChange (event: any) {
		// event.preventDefault()
		console.log(event)
		// return false
	}

	const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = (event) => {
		if (event.code === "Enter") {
			event.preventDefault()

			if (formRef.current) {
				formRef.current.submit()
			}
		}
	}

	function handleClose () {
		setSettings({
			...settings,
			opened: false,
			text: null,
		})

		if (onClose) {
			onClose()
		}
	}

	return (
		<Dialog
			maxWidth={ "md" }
			fullWidth={ true }
			open={ settings.opened }
			onClose={ handleClose }
		>
			<DialogTitle
				fontWeight={ "bold" }
				fontFamily={ theme => theme.typography.fontFamily }
				display={ "flex" }
				alignItems={ "center" }
				justifyContent={ "flex-start" }
				borderBottom={ "1px solid rgba( 0, 0, 0, 0.1)" }
				marginBottom={ 2 }
			>
				<FindReplaceRounded
					sx={ {
						marginRight: 1,
						marginTop: "0.1rem",
					} }
				/>
				Create new Grammar Rule
			</DialogTitle>

			<DialogContent
				style={ {
					paddingTop: "0.55rem",
				} }
			>
				<Grid
					component={ "form" }
					spacing={ 2 }
					onSubmit={ handleSubmit }
					onKeyDown={ handleKeyDown }
					ref={ formRef }
					container
				>
					<Grid
						item
						style={ {
							minWidth: "100%",
						} }
					>
						<TextareaAutosize
							aria-label="minimum height"
							minRows={ 3 }
							value={ settings.text || "" }
							placeholder="Minimum 3 rows"
							style={ { width: "100%" } }
						/>
					</Grid>
					<Grid item>
						<TextField
							name={ "regex" }
							label={ "Replace (RegExp)" }
							type={ "text" }
							value={ settings.text || "" }
							required
						/>
					</Grid>

					<Grid item>
						<TextField
							name={ "regex" }
							label={ "with …" }
							type={ "text" }
							required
						/>
					</Grid>

					<Grid item xs={ 12 }>
						<Typography component={ "p" }>
							Replace <code>{ settings.text }</code> with …
						</Typography>
					</Grid>
				</Grid>
			</DialogContent>

			<DialogActions>
				<Button
					variant={ "contained" }
					type={ "submit" }
					color={ "primary" }
				>
					Add this Grammar Rule
				</Button>
			</DialogActions>
		</Dialog>
	)
}