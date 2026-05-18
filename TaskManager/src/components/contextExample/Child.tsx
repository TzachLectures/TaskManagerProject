import { useContext } from "react";
import { ExampleContext } from "../../providers/ExampleProvider";

function Child() {
  const { something } = useContext(ExampleContext);
  console.log(something);
  return <div>this is child component</div>;
}

export default Child;
