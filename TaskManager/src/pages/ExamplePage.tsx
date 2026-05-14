import useCounter from "../hooks/useCounter";
import { Button, Typography, TextField } from "@mui/material";

function ExamplePage() {
  const { count, step, handleInc, handleDec, setStep } = useCounter(50, 2);
  return (
    <div>
      <Typography>{count}</Typography>
      <TextField
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      />
      <Button onClick={handleInc}>+</Button>
      <Button onClick={handleDec}>-</Button>
    </div>
  );
}

export default ExamplePage;
