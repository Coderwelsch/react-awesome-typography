import React, { Fragment, useContext } from "react"

import SettingsContext from "../../context/Setttings"
import { BootstrapTooltip } from "./BootstrapTooltip"


export default function Popover () {
	const [ settings ] = useContext(SettingsContext)

	if (!settings.popover) {
		return null
	}

	const {
		center,
		children,
		popoverProps = {},
	} = settings.popover

	return (
		<BootstrapTooltip
			open={ true }
			placement={ "top" }
			title={
				<Fragment>
					{ children }
				</Fragment>
			}
			{ ...popoverProps }
		>
			<div
				style={ {
					position: "absolute",
					top: center[1] + 20,
					left: center[0] + 15,
				} }
			/>
		</BootstrapTooltip>
	)
}