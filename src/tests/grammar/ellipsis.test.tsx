import React, { FC } from "react"
import "@testing-library/jest-dom"
import { cleanup, render } from "@testing-library/react"

import RAT, { AwesomeTypographyProps } from "../../index"


afterEach(() => {
	cleanup()
})

const NoOpticalAlign:FC<AwesomeTypographyProps> = (props) => (
	<RAT
		{ ...props }
		opticalAlignment={ false }
	/>
)

describe("replaces wrong ellipses", () => {
	it("... to …", function () {
		const { container } = render(<NoOpticalAlign>...</NoOpticalAlign>)
		expect(container.innerHTML).toBe("…")
	})
})