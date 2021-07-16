import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
} from '@material-ui/core';

export interface SwitchListItemProps {
  primary?: string;
  secondary?: string;
  checked?: boolean;
  onToggle: () => void;
}

export default function SwitchListItem({
  primary,
  secondary,
  checked,
  onToggle,
}: SwitchListItemProps) {
  return (
    <ListItem button onClick={onToggle}>
      <ListItemText primary={primary} secondary={secondary} />
      <ListItemSecondaryAction>
        <Switch
          edge="end"
          checked={checked}
          onChange={onToggle}
          inputProps={{ 'aria-label': primary }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
