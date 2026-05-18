import Parent from "./Parent";
function GrandParent() {
  return (
    <div>
      this is grandparent component
      <Parent />
    </div>
  );
}

export default GrandParent;
