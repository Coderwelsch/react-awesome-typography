import React, { useState } from "react"
import OpticalAlignment from "react-awesome-typography"

import "./index.css"


function cn (...classNames: any[]): string {
	return classNames.filter((c) => typeof c === "string").join(" ")
}

function App () {
	const [ awesomeTypeActive, setAwesomeTypeActive ] = useState(true)
	const [ debug, setDebug ] = useState(true)

	return (
		<section className={ cn(debug && "debug-active") }>
			<div className={ "button-group" }>
				<button
					className={ cn(awesomeTypeActive && "enabled") }
					onClick={ () => {
						setDebug(!awesomeTypeActive)
						setAwesomeTypeActive(!awesomeTypeActive)
					} }
				>
					{ awesomeTypeActive
						? `✔︎ Awesome Type enabled`
						: `✘︎ Awesome Type disabled` }
				</button>

				<button
					className={ cn(debug && "enabled") }
					onClick={ () => setDebug(!debug) }
				>
					{ debug ? `✔︎ Debug enabled` : `✘︎ Debug disabled` }
				</button>
			</div>

			<hr />

			<div className={ cn("container") }>
				<OpticalAlignment
					enabled={ awesomeTypeActive }
					debug={ debug }
				>
					<h1>
						Web typo&shy;graphy on steroids ....... !
					</h1>

					<blockquote>
						"This React component optimizes the readability of your texts and fixes typographical errors automatically."
					</blockquote>

					<p>
						This component comes with a (not completed) list of regular expression based rule sets to adjust and replace misspellings in your texts.
						The <code>react-awesome-typography</code> component uses two different kinds of rulesets:
					</p>

					<h2>Replacement Rules</h2>
				</OpticalAlignment>
			</div>
		</section>
	)
}

export default App
