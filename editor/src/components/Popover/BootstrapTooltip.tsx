import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material"
import React from "react"


export const BootstrapTooltip = styled(({
	className,
	children,
	...props
}: TooltipProps) => (
	<Tooltip
		placement={ "top" }
		{ ...props }
		arrow
		classes={ {
			popper: className,
		} }
	>
		{ children }
	</Tooltip>
))(({ theme }) => ({
	[`& .${ tooltipClasses.arrow }`]: {
		color: theme.palette.common.black,
	},
	[`& .${ tooltipClasses.tooltip }`]: {
		backgroundColor: theme.palette.common.black,
	},
}))