import React, { useState } from "react"
import OpticalAlignment from "react-awesome-typography"

import "./index.css"


const HEADING_TEXT = `
	You think web typo&shy;graphy can’t be good?
`

const COPY_TEXT = `
	"This react component transforms your copy text into awesome text, every wants to read ................. " You can define your own rules for perfect optical alignment and fixing misspellings and typographical issues like wrong typed ellipses: ..............................  
`

function cn (...classNames: any[]): string {
	return classNames.filter(c => typeof c === "string").join(" ")
}

function App () {
	const [ awesomeTypeActive, setAwesomeTypeActive ] = useState(true)

	return (
		<section>
			<button
				className={ cn(awesomeTypeActive && "enabled") }
				onClick={ () => setAwesomeTypeActive(!awesomeTypeActive) }
			>
				{ awesomeTypeActive ? `✔︎ Awesome Type enabled` : `✘︎ Awesome Type disabled` }
			</button>

			<hr />

			<div className={ cn("container") }>
				{ awesomeTypeActive ?
					<h1>
						<OpticalAlignment debug={ true }>
							You think web typo&shy;graphy can't be good?
						</OpticalAlignment>
					</h1>
					:
					<h1 dangerouslySetInnerHTML={ { __html: HEADING_TEXT } } />
				}

				{ awesomeTypeActive ?
					<p>
						<OpticalAlignment debug={ true }>
							"This react component transforms your copy text into awesome text, everyone wants to read ................. "
							<br/><br/>
							You can define your own rules to optical align words (on left text column side), fix misspellings and typographical issues like
							wrong typed ellipses: ..............................
						</OpticalAlignment>
					</p>
					:
					<p dangerouslySetInnerHTML={ { __html: COPY_TEXT } } />
				}
			</div>
		</section>
	)
}

export default App
