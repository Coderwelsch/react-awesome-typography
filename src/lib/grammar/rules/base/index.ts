import { GrammarRules } from "../../../../types"
import { combineRules } from "../helper"
import essentials from "./essentials"


const BaseRuleSet: GrammarRules = combineRules(
	essentials,
)

export default BaseRuleSet