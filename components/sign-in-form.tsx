import {
  Button,
  ButtonProps,
  TextField,
  TextFieldProps,
} from '@material-ui/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import useStyles from './form.styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useUniqueId from '../hooks/use-unique-id';

export type Inputs = { username: string; password: string };

const schema: yup.SchemaOf<Inputs> = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export interface SignInFormProps {
  TextFieldVariant?: TextFieldProps['variant'];
  ButtonVariant?: ButtonProps['variant'];
  ButtonColor?: ButtonProps['color'];
  onSubmit: SubmitHandler<Inputs>;
}

export default function SignInForm({
  TextFieldVariant,
  ButtonVariant,
  ButtonColor,
  onSubmit,
}: SignInFormProps) {
  const classes = useStyles();

  const usernameFieldId = useUniqueId();
  const passwordFieldId = useUniqueId();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  return (
    <form className={classes.root} noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextField
        id={usernameFieldId}
        required
        label="Username"
        variant={TextFieldVariant}
        inputProps={register('username')}
        error={errors.username !== undefined}
        helperText={errors.username?.message}
        FormHelperTextProps={{ className: classes.formHelperText }}
      />
      <TextField
        id={passwordFieldId}
        required
        label="Password"
        type="password"
        variant={TextFieldVariant}
        inputProps={register('password')}
        error={errors.password !== undefined}
        helperText={errors.password?.message}
        FormHelperTextProps={{ className: classes.formHelperText }}
      />
      <Button type="submit" variant={ButtonVariant} color={ButtonColor}>
        Sign in
      </Button>
    </form>
  );
}
