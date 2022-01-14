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

			<hr />

			<div className={ cn("container") }>
				<OpticalAlignment
					enabled={ awesomeTypeActive }
					debug={ debug }
				>
					<h1>
						Web typo&shy;graphy on steroids !
					</h1>

					<p>
						"This react component transforms your copy text into awesome text,
						everyone wants to read ................. "
						<br />
						<br />
						<i>You can define your own rules to optical align words (on left text column side),</i> fix misspellings and typographical issues like wrong
						typed ellipses: ..............................
					</p>
				</OpticalAlignment>
			</div>
		</section>
	)
}

export default App
