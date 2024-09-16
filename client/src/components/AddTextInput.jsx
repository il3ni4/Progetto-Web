import { Grid2, TextField, Button } from "@mui/material";


function AddTextInput ({ label, object, handleChange, addHandler }) {
  return (
    <Grid2 container style={{padding: '10px', margin: '20px 10px'}}spacing={1} direction="column">
      {object && object.map((value, index) => (
        <Grid2 item key={index} size={{ xs: 12, md: 8 }} style={{width: '100%'}} >
          <TextField
            label={`${label} ${index + 1}`}
            value={value}
            onChange={(e) => handleChange(index, e)}
            fullWidth
            multiline
          />
        </Grid2>
      ))}
      <Grid2 item size={{ xs: 12, md: 8 }} style={{width: '100%'}}>
        <Button variant="outlined" onClick={addHandler} fullWidth>
          Aggiungi {label}
        </Button>
      </Grid2>
    </Grid2>
  );
}
export default AddTextInput;