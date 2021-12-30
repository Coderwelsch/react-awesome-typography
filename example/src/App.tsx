import React, { useEffect, useState } from "react"
import OpticalAlignment from "optical-aligned-text"


const texts = [
	`Dies ist ein ........ Typo&shy;blind&shy;text. An ihm kann man sehen, ob alle Buch&shy;staben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburge&shy;fonts, Raf&shy;gen&shy;duks oder Hand&shy;gloves, um Schriften zu testen. Manchmal Sätze, die alle Buch&shy;staben des Alpha&shy;bets ent&shy;halten - man nennt diese Sätze »Pangrams«. Sehr bekannt ist dieser: The quick brown fox jumps over the lazy old dog. Oft werden in Typo&shy;blind&shy;texte auch fremd&shy;sprachige Satz&shy;teile ein&shy;ge&shy;baut (AVAIL® and Wefox™ are testing aussi la Kerning), um die Wirkung in anderen Sprachen zu testen. In La&shy;tein&shy;isch sieht zum Beispiel fast jede Schrift gut aus. Quod erat demon&shy;stran&shy;dum. Seit 1975 fehlen in den meisten Test&shy;texten die Zahlen, weswegen nach TypoGb. 204 § ab dem Jahr 2034 Zahlen in 86 der Texte zur Pflicht werden. Nicht&shy;einhalt&shy;ung wird mit bis zu 245 € oder 368 $ bestraft. Genauso wichtig in sind mittler&shy;weile auch Âçcèñtë, die in neueren Schriften aber fast immer enthalten sind. Ein wichtiges aber schwierig zu inte&shy;grie&shy;rendes Feld sind OpenType-Funktionali&shy;täten. Je nach Software und Vor&shy;ein&shy;stellungen können ein&shy;ge&shy;baute Kapi&shy;tälchen, Kerning oder Ligaturen (sehr pfiffig) nicht richtig dar&shy;ge&shy;stellt werden. Dies ist ein Typo&shy;blind&shy;text. An ihm kann man sehen, ob alle Buch&shy;staben da sind und wie sie aussehen.`,
]

function App () {
	const [ currentTextIndex, setCurrentTextIndex ] = useState(Math.floor(Math.random()* texts.length))

	const loop = () => {
		setTimeout(() => {
			let nextIndex = currentTextIndex

			while (currentTextIndex === nextIndex) {
				nextIndex = Math.floor(Math.random()* texts.length)
			}

			setCurrentTextIndex(nextIndex)
		}, 3000)
	}

	// useEffect(() => {
	// 	loop()
	// })

	return (
		<section>
			<div className="container">
				<h1>
					<OpticalAlignment debug={ true }>
						{ `Willy&shy;Wonka` }
						Willy&shy;Wonka Wother&shy;fuckerrrr
					</OpticalAlignment>
				</h1>

				{/*<p>*/}
				{/*	<OpticalAlignment debug={ true }>*/}
				{/*		{ texts[currentTextIndex] }*/}
				{/*	</OpticalAlignment>*/}
				{/*</p>*/}
			</div>
		</section>
	)
}

export default App
