<p align="center" style="background-color: #0d1117;">
<br/>
<br/>
    <img 
        src="doc/readme/logo/react/dark.svg" 
        alt="Awesome Typography – The Config Editor" 
        style="display: block; max-width: 20rem;" 
    />
<br/>
<br/>
    <a href="https://github.com/Coderwelsch/react-awesome-typography/actions/workflows/node.js.yml">
        <img 
            src="https://github.com/Coderwelsch/react-awesome-typography/actions/workflows/node.js.yml/badge.svg" 
            alt="Node.js CI" 
            style="display: block; max-width: 20rem;" 
        />
    </a>
    <br/>
    <br/>
</p>

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

Then run from within the root directory:

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

# Feel free to contribute!

It would be an honor working with you!

# ToDos

- [x] Write Tests 
- [x] Add Feature: Optical Alignment (`alignmentRules`)
- [ ] Add Feature: Preserve Orphans
- [ ] Add Feature: Rules for optical letter spacing
- [x] Add Feature: Grammar / Misspelling Rules (`grammarRules`)
- [x] Prevent Word Line Jumps on active Optical Alignment Rules
- [ ] Fix multiline word breaks when using special html entities in word
- [ ] Add Feature: Find syllables and softwrap them (using `&shy;`)
- [ ] Add Feature: support for rtl text
