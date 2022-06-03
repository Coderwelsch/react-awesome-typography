<br/>
<br/>

<p align="center">
    <img 
        src="doc/logo-teaser.svg" 
        alt="Awesome Typography – The Config Editor" 
        style="display: block; max-width: 20rem;" 
    />
</p>

<br/>

> Typography matters – even on the web. This typescript react component will
> align words visually and replaces typical misspellings every typographer hates.
> This is a react component for all who needs more control over copy texts in
> their apps.

⚠️ _This plugin is not production-ready! Support highly appreciated_  ❤️️

<br/>
<hr/>

## Current State of this Project

This plugin is currently under construction and not production-ready. 

## Figma Design

I’ve created a figma design for the config editor. The design isn’t fully implemented yet. If you want I can grant you access to the figma files to work together on the design 🥳!

[**Figma Prototype →**](https://www.figma.com/proto/Ip1ZScLgGiaGIDKu7QuHdZ/Editor?node-id=11%3A3&scaling=min-zoom&page-id=0%3A1)

## Font Config Editor

![Config Editor](./doc/readme/editor.png)

To run the editor, install the npm modules in both of the root and editor
directories:

```shell
# install npm deps under both dirs:
yarn # npm i
yarn --cwd editor
```

Then start from

```
# start
yarn start # npm run start
```

<br/>
<hr/>

## Install

```shell
yarn add react-awesome-typography
# or
npm install react-awesome-typography
```

<br/>
<hr/>

## Run tests

```shell
yarn test # npm run test

# or in watch mode:
yarn test:watch # npm run test:watch
```

[//]: # (## Usage )

[//]: # ()

[//]: # (Just use the component like this:)

[//]: # ()

[//]: # (```jsx harmony)

[//]: # (import React from "react";)

[//]: # (import AwesomeTypo from "react-awesome-typography";)

[//]: # ()

[//]: # ()

[//]: # (const replacementRules = [)

[//]: # (	{)

[//]: # (		test: /&#40;["]&#41;&#40;[^"]+&#41;&#40;["]&#41;/,)

[//]: # (		replace: "«$2»",)

[//]: # (		description: "replace wrong quotes with french ones")

[//]: # (	},)

[//]: # (	// ...)

[//]: # (];)

[//]: # ()

[//]: # (const opticalAlignmentRules = [)

[//]: # (	{)

[//]: # (		id: "W", // unique name)

[//]: # (		test: /W/, // regex to test if a word matches your rule )

[//]: # (		offset: -0.2 // `ch` &#40;character&#41; units)

[//]: # (	}, {)

[//]: # (		id: "Quotes",)

[//]: # (		test: /[«]/,)

[//]: # (		className: "your-custom-classname" // works also with classNames)

[//]: # (	})

[//]: # (];)

[//]: # ()

[//]: # (export default &#40;&#41; =>)

[//]: # (	<section className="container">)

[//]: # (		<h1>)

[//]: # (			<AwesomeTypo)

[//]: # (				alignmentRules={ opticalAlignmentRules })

[//]: # (				replacementRules={ replacementRules })

[//]: # (				debug={ true })

[//]: # (				debugOptions={ {)

[//]: # (					idleBgColor: "rgba&#40;0,200,255,0.14&#41;",)

[//]: # (					activeBgColor: "rgba&#40;255,99,43,0.2&#41;",)

[//]: # (				} })

[//]: # (			>)

[//]: # (				Good Typography in Web Won't Exists?)

[//]: # (			</AwesomeTypo>)

[//]: # (		</h1>)

[//]: # ()

[//]: # (		<p>)

[//]: # (			<AwesomeTypo alignmentRules={ opticalAlignmentRules }>)

[//]: # (				"Good typography for web is really hard to accomplish .............. !")

[//]: # (				But with this component, everyone can improve his/her texts without any effort.)

[//]: # (			</AwesomeTypo>)

[//]: # (		</p>)

[//]: # (	</section>)

[//]: # (```)

[//]: # ()

[//]: # (<br/>)

[//]: # (<hr/>)

# Feel free to contribute!

It would be an honor working with you!

# ToDos

- [x] Add Feature: Optical alignment (`alignmentRules`)
- [ ] Add Feature: Preserve Orphans (`fixWidows`)
- [ ] Add Feature: Replace typical misspellings (`replacementRules`)
- [ ] Fix multiline word breaks when using special html entities in word
- [ ] Add Feature: Find syllables and softwrap them (using `&shy;`)
- [ ] Add Feature: support for rtl text
