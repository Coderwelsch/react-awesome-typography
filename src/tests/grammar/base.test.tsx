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

describe("replaces grammar problems", () => {
	it("multiple wrong ellipses", function () {
		const { container } = render(<NoOpticalAlign>You are ... beauti...... to meeeee!</NoOpticalAlign>)
		expect(container.innerHTML).toBe("You are … beauti… to meeeee!")
	})

	it("fix grammar in html elements", function () {
		const { container } = render(
			<NoOpticalAlign>
				<h1>You are ... beauti...... to meeeee!</h1>
			</NoOpticalAlign>
		)
		expect(container.innerHTML).toBe("<h1>You are … beauti… to meeeee!</h1>")
	})

	it("don’t removes elements without children", function () {
		const { container } = render(
			<NoOpticalAlign>
				<h1>You are ... beauti...... to meeeee!</h1>
				<br/>
			</NoOpticalAlign>
		)
		expect(container.innerHTML).toBe("<h1>You are … beauti… to meeeee!</h1><br>")
	})

	it("don’t removes nested elements without children", function () {
		const { container } = render(
			<NoOpticalAlign>
				<h1>Hello<br/>World</h1>
			</NoOpticalAlign>
		)
		expect(container.innerHTML).toBe("<h1>Hello<br>World</h1>")
	})

	it("render nested dom elements", function () {
		const { container } = render(
			<NoOpticalAlign>
				Outer text ........
				<section>
					<p>
						Inner text ...........
					</p>
					Second inner ....... ?
				</section>
			</NoOpticalAlign>
		)
		expect(container.innerHTML).toBe("Outer text …<section><p>Inner text …</p>Second inner … ?</section>")
	})
})