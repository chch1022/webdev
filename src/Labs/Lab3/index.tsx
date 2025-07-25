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
import TemplateLiterals from './TemplateLiterals';
import SimpleArrays from './SimpleArrays';
import ArrayIndexAndLength from './ArrayIndexAndLength';
import AddingAndRemovingToFromArrays from './AddingAndRemovingToFromArrays';
import ForLoops from './ForLoops';
import MapFunction from './MapFunction';
import FindFunction from './FindFunction';
import FindIndex from './FindIndex';
import FilterFunction from './FilterFunction';
import JsonStringify from './JsonStringify';
import House from './House';
import TodoItem from './todos/TodoItem';
import TodoList from './todos/TodoList';
import Spreading from './Spreading';
import Destructing from './Destructing';
import FunctionDestructing from './FunctionDestructing';
import DestructingImports from './DestructingImports';
import Classes from './Classes';
import Styles from './Styles';
import Add from './Add';
import Square from './Square';
import Highlight from './Highlight';
import AddPathParameters from './AddPathParameters';
import PathParameters from './PathParameters';

export default function Lab3() {
  console.log("Hello World!");
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
      <TemplateLiterals />
      <SimpleArrays />
      <ArrayIndexAndLength />
      <AddingAndRemovingToFromArrays />
      <ForLoops />
      <MapFunction />
      <FindFunction />
      <FindIndex />
      <FilterFunction />
      <JsonStringify />
      <House />
      <TodoItem />
      <TodoList />
      <Spreading />
      <Destructing />
      <FunctionDestructing />
      <DestructingImports />
      <Classes />
      <Styles />
      <Add a={1} b={2} />
      <Add a={3} b={4} />
      <div id="wd-lab3">
        <h3>JavaScript</h3>
        <h4>Square of 4</h4>
        <Square>4</Square>
        <hr />
      </div>
       <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
     </Highlight>
     <AddPathParameters />
     <PathParameters />


    </div>
  );
}

