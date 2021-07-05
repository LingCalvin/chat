import { TextField as MuiTextField, TextFieldProps } from '@material-ui/core';
import { useUID } from 'react-uid';

/**
 * A wrapper around TextField so that the ID prop is always set. This ensures
 * that the input field's label and helper text are associated with the input
 * field.
 */
export default function TextField({ id, ...rest }: TextFieldProps) {
  const uniqueId = useUID();
  return <MuiTextField id={id ?? uniqueId} {...rest} />;
}
