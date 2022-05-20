import "@testing-library/jest-dom"
import { cleanup, render } from "@testing-library/react"
import React, { FC } from "react"

import RAT, { AwesomeTypographyProps } from "../../index"
import { NoOpticalAlign } from "./base.test"


afterEach(() => {
	cleanup()
})

describe("replaces wrong ellipses", () => {
	it("... to …", function () {
		const { container } = render(<NoOpticalAlign>...</NoOpticalAlign>)
		expect(container.innerHTML).toBe("…")
	})
})