import "@testing-library/jest-dom"
import { cleanup, render } from "@testing-library/react"
import React from "react"

import RAT from "../../index"


afterEach(() => {
	cleanup()
})

describe("Prevent Orphans", () => {
	it("Adds non breaking space between forelast and last word", function () {
		const { container } = render(
			<RAT>
				Oooooh, poor child!
			</RAT>,
		)

		expect(container.innerHTML).toBe(`<br style="display: none;"><span style="display: inline-block; margin-left: -0.05ch;">Oooooh, </span>poor&nbsp;child!`)
	})

	it("Adds correct spacing by overlapping optical aligned words", function () {
		const { container } = render(
			<RAT>
				World Wide Web
			</RAT>,
		)

		expect(container.innerHTML).toBe(`<br style="display: none;"><span style="display: inline-block; margin-left: -0.15ch;">World </span><br style="display: none;"><span style="display: inline-block; margin-left: -0.15ch;">Wide&nbsp;Web</span>`)
	})

	it("Adds correct spacing by mixed forelast optical aligned word and normal last word", function () {
		const { container } = render(
			<RAT>
				Web rocks!
			</RAT>,
		)

		expect(container.innerHTML).toBe(`<br style="display: none;"><span style="display: inline-block; margin-left: -0.15ch;">Web&nbsp;rocks!</span>`)
	})

	it("Adds correct spacing by mixed forelast optical aligned word and normal last word", function () {
		const { container } = render(
			<RAT>
				Hello, awesome world!
			</RAT>,
		)

		expect(container.innerHTML).toBe(`Hello, awesome&nbsp;<br style="display: none;"><span style="display: inline-block; margin-left: -0.15ch;">world!</span>`)
	})
})