import React from "react"
import "@testing-library/jest-dom"
import { cleanup, render } from "@testing-library/react"

import RAT from "../../index"


afterEach(() => {
	cleanup()
})

describe("replaces grammar problems", () => {
	it("multiple wrong ellipses", function () {
		const { container } = render(<RAT>You are ... beauti...... to meeeee!</RAT>)
		expect(container.innerHTML).toBe("You are … beauti… to meeeee!")
	})

	it("fix grammar in html elements", function () {
		const { container } = render(
			<RAT>
				<h1>You are ... beauti...... to meeeee!</h1>
			</RAT>
		)
		expect(container.innerHTML).toBe("<h1>You are … beauti… to meeeee!</h1>")
	})

	it("don’t removes elements without children", function () {
		const { container } = render(
			<RAT>
				<h1>You are ... beauti...... to meeeee!</h1>
				<br/>
			</RAT>
		)
		expect(container.innerHTML).toBe("<h1>You are … beauti… to meeeee!</h1><br>")
	})

	it("don’t removes nested elements without children", function () {
		const { container } = render(
			<RAT>
				<h1>Hello<br/>World</h1>
			</RAT>
		)
		expect(container.innerHTML).toBe("<h1>Hello<br>World</h1>")
	})

	it("render nested dom elements", function () {
		const { container } = render(
			<RAT>
				Outer text ........
				<section>
					<p>
						Inner text ...........
					</p>
					Second inner ....... ?
				</section>
			</RAT>
		)
		expect(container.innerHTML).toBe("Outer text …<section><p>Inner text …</p>Second inner … ?</section>")
	})
})