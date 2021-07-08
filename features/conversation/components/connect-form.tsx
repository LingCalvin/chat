import { Button, InputAdornment } from '@material-ui/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextField from '../../../common/components/text-field';

export type Inputs = {
  id: string;
};

export interface ConnectFormProps {
  disabled?: boolean;
  onSubmit: SubmitHandler<Inputs>;
}

export default function ConnectForm({ disabled, onSubmit }: ConnectFormProps) {
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
              <Button type="submit" disabled={disabled}>
                Connect
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
