import { Button, InputAdornment, TextField } from '@material-ui/core';
import { SubmitHandler, useForm } from 'react-hook-form';

export type Inputs = {
  id: string;
};

export interface ConnectFormProps {
  onSubmit: SubmitHandler<Inputs>;
}

export default function ConnectForm({ onSubmit }: ConnectFormProps) {
  const { handleSubmit, register } = useForm<Inputs>();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        variant="outlined"
        label="Other person's ID"
        required
        inputProps={register('id')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button type="submit">Connect</Button>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
