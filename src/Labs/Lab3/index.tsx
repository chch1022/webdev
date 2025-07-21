import BooleanVariables from './BooleanVariables';  
import ConditionalOutputInline from './ConditionalOutputInline';
import ConditionalOutputIfElse from './ConditionalOutputIfElse'; 
import TernaryOperator from './TernaryOperator';
import IfElse from './IfElse';
import VariableTypes from './VariableTypes';
import VariablesAndConstants from './VariablesAndConstants';
import LegacyFunctions from './LegacyFunctions';
import ArrowFunctions from './ArrowFunctions';
import ImpliedReturn from './ImpliedReturn';

export default function Lab3() {
  return (
    <div>
      <h2>Lab 3</h2>
      <VariablesAndConstants />
      <VariableTypes />
      <BooleanVariables />
      <IfElse />
      <TernaryOperator />
      <ConditionalOutputIfElse /> 
      <ConditionalOutputInline />
      <LegacyFunctions />
      <ArrowFunctions />
      <ImpliedReturn />
    </div>
);}
