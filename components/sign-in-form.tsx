import { Button, ButtonProps, TextFieldProps } from '@material-ui/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import useStyles from './form.styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from './text-field';

export type Inputs = { username: string; password: string };

const schema: yup.SchemaOf<Inputs> = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export interface SignInFormProps {
  TextFieldVariant?: TextFieldProps['variant'];
  ButtonVariant?: ButtonProps['variant'];
  ButtonColor?: ButtonProps['color'];
  disabled?: boolean;
  onSubmit: SubmitHandler<Inputs>;
}

export default function SignInForm({
  TextFieldVariant,
  ButtonVariant,
  ButtonColor,
  disabled,
  onSubmit,
}: SignInFormProps) {
  const classes = useStyles();

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
        required
        label="Username"
        variant={TextFieldVariant}
        inputProps={register('username')}
        error={errors.username !== undefined}
        helperText={errors.username?.message}
        FormHelperTextProps={{ className: classes.formHelperText }}
        disabled={disabled}
      />
      <TextField
        required
        label="Password"
        type="password"
        variant={TextFieldVariant}
        inputProps={register('password')}
        error={errors.password !== undefined}
        helperText={errors.password?.message}
        FormHelperTextProps={{ className: classes.formHelperText }}
        disabled={disabled}
      />
      <Button
        type="submit"
        variant={ButtonVariant}
        color={ButtonColor}
        disabled={disabled}
      >
        Sign in
      </Button>
    </form>
  );
}
