import logo from './logo.svg';
import './App.css';
// or
import { FormGroup ,Checkbox, FormControlLabel } from '@mui/material';


function App() {
  return (
    <div className="App">
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
        <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
      </FormGroup>
    </div>
  );
}

export default App;
