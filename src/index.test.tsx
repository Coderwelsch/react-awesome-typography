import React from "react"
import renderer from "react-test-renderer"

import OpticalAlignment from "./index"


const Span = ({ word, ri }: { word: string, ri?: number }) => <span dangerouslySetInnerHTML={ { __html: word } } data-ri={ ri } />


describe("Child Deconstruction Checks", () => {
	test("Reconstruct text and whitespaces correctly", () => {
		const component = renderer.create(
			<OpticalAlignment>
				<h1> World Wide Web </h1>
			</OpticalAlignment>
		)

		const compare = renderer.create(
			<h1> <Span word={ "World" } ri={ 1 } /> <Span word={ "Wide" } ri={ 1 } /> <Span word={ "Web" } ri={ 1 } /> </h1>
		)

		const tree = component.toJSON()
		const compareTree = compare.toJSON()

		expect(tree).toMatchObject(compareTree)
	})

	test("Split word by included html entities (to align them on line breaks too)", () => {
		const component = renderer.create(
			<OpticalAlignment>
				<h1>Areallylongword&shy;withshys</h1>
			</OpticalAlignment>
		)

		const compare = renderer.create(
			<h1>Areallylongword&shy;<Span word={ "withshys" } ri={ 1 } /></h1>
		)

		const tree = component.toJSON()
		const compareTree = compare.toJSON()

		expect(tree).toMatchObject(compareTree)
	})
})

// describe("Misspelling Replacements", () => {
// 	test("Fix ellipsis", () => {
// 		const component = renderer.create(
// 			<OpticalAlignment>
// 				<h1>Please don’t use ......</h1>
// 			</OpticalAlignment>
// 		)
//
// 		const compare = renderer.create(
// 			<h1>Please don’t use&nbsp;…</h1>
// 		)
//
// 		const tree = component.toJSON()
// 		const compareTree = compare.toJSON()
//
// 		expect(tree).toMatchObject(compareTree)
// 	})
// })