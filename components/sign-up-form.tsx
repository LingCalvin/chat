import { yupResolver } from '@hookform/resolvers/yup';
import { Button, ButtonProps, TextFieldProps } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import useStyles from './form.styles';
import TextField from './text-field';

export type Inputs = {
  username: string;
  password: string;
  confirmPassword: string;
};

const schema: yup.SchemaOf<Inputs> = yup.object().shape({
  username: yup.string().required().min(3).max(256),
  password: yup.string().required().min(8).max(256),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export interface SignUpFormProps {
  TextFieldVariant?: TextFieldProps['variant'];
  ButtonVariant?: ButtonProps['variant'];
  ButtonColor?: ButtonProps['color'];
  disabled?: boolean;
  onSubmit: SubmitHandler<Inputs>;
}

export default function SignUpForm({
  TextFieldVariant,
  ButtonVariant,
  ButtonColor,
  disabled,
  onSubmit,
}: SignUpFormProps) {
  const classes = useStyles();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        variant={TextFieldVariant}
        label="Username"
        inputProps={register('username')}
        error={errors.username !== undefined}
        helperText={errors.username?.message}
        FormHelperTextProps={{ className: classes.formHelperText }}
        disabled={disabled}
      />
      <TextField
        variant={TextFieldVariant}
        label="Password"
        type="password"
        inputProps={register('password')}
        error={errors.password !== undefined}
        helperText={errors.password?.message}
        FormHelperTextProps={{ className: classes.formHelperText }}
        disabled={disabled}
      />
      <TextField
        variant={TextFieldVariant}
        label="Confirm password"
        type="password"
        inputProps={register('confirmPassword')}
        error={errors.confirmPassword !== undefined}
        helperText={errors.confirmPassword?.message}
        FormHelperTextProps={{ className: classes.formHelperText }}
        disabled={disabled}
      />
      <Button
        type="submit"
        color={ButtonColor}
        variant={ButtonVariant}
        disabled={disabled}
      >
        Sign up
      </Button>
    </form>
  );
}
