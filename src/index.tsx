import React, { Children, FC, ReactNode, useEffect, useRef, useState } from "react"
import { transformChild } from "./lib"
import Rules from "./lib/grammar/rules"

import { GrammarRules } from "./types"


export interface AwesomeTypographyProps {
	enabled?: boolean,
	children?: ReactNode,
	rules?: GrammarRules,
	opticalAlignment?: boolean,
	className?: string
}


const ReactAwesomeTypography: FC<AwesomeTypographyProps> = ({
	enabled = true,
	children,
	rules = Rules,
	opticalAlignment = true,
	...props
}) => {
	const parentRef = useRef<HTMLDivElement>(null)
	const childrenArray = Children.toArray(children)
	const [ containerSize, setContainerSize ] = useState<number>(0)

	const transformedChildren = React.useMemo(() => {
		return childrenArray.map((child, index) =>
			transformChild({
				child,
				index,
				grammarRules: rules,
				opticalAlignment,
			}),
		)
	}, [children, parentRef, containerSize])

	if (!opticalAlignment) {
		return (
			<>{ transformedChildren }</>
		)
	}

	const handleResize = () => {
		if (parentRef.current && parentRef.current.offsetWidth !== containerSize) {
			setContainerSize(parentRef.current.offsetWidth)
		}
	}

	useEffect(() => {
		if (parentRef.current) {
			const elem = parentRef.current as HTMLSpanElement
			const elemRect = elem.getBoundingClientRect()

			elem.querySelectorAll("span[data-oa]").forEach((e) => {
				const casted = e as HTMLSpanElement
				casted.style.marginLeft = ""

				const clientRect = e.getBoundingClientRect()

				if (clientRect.left === elemRect.left) {
					console.log("on left side", e)
					casted.style.marginLeft = "-1ch";
				}
			})
		}
	},[transformedChildren])

	useEffect(() => {
		window.addEventListener("resize", handleResize)

		if (parentRef.current) {
			setContainerSize(parentRef.current.offsetWidth)
		}

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	return (
		<div
			{ ...props }
			ref={ parentRef }
		>
			{ transformedChildren }
		</div>
	)
}

export default ReactAwesomeTypography