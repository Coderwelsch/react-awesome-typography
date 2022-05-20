import React, { CSSProperties } from "react"


export interface GrammarRule {
	test: RegExp,
	replace: string | ((...args: string[]) => string),
	description?: string
}


export type GrammarRules = GrammarRule[]


export interface AlignmentRule {
	id: string,
	test: RegExp,
	className?: string,
	offset?: number
}


export interface DebugOptions {
	idleStyle: CSSProperties;
	activeStyle: CSSProperties;
}


export interface OpticalAlignmentNodesProps {
	fixedText: string,
	debug?: boolean | DebugOptions
}


export const DEFAULT_DEBUG_STYLES: DebugOptions = {
	activeStyle: {
		backgroundColor: `rgba(255, 100, 100, 0.2)`,
	},
	idleStyle: {
		backgroundColor: `rgba(100, 100, 255, 0.2)`,
	},
}


export interface NodeProps {
	text: string,
	rule: AlignmentRule,
	debug?: boolean | DebugOptions
	isLastWord: boolean
}


export enum DebugNodeState {
	NONE = "none",
	IDLE = "idle",
	ACTIVE = "active",
}


export interface TransformChildProps {
	child: React.ReactNode,
	index: number,
	grammarRules: GrammarRules,
	opticalAlignment: boolean,
	debug?: boolean | DebugOptions
}