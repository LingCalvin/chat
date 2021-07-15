import {
  Code,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatStrikethrough,
  FormatUnderlined,
} from '@material-ui/icons';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { Editor } from '@tiptap/react';
import useStyles from './message-editor-menu-bar.styles';

export interface MessageEditorMenuBarProps {
  editor: Editor | null;
  className?: string;
}

export default function MessageEditorMenuBar({
  editor,
  className,
}: MessageEditorMenuBarProps) {
  const classes = useStyles();
  return (
    <ToggleButtonGroup className={className}>
      <ToggleButton
        aria-label="bold"
        className={classes.toggleButton}
        selected={editor?.isActive('bold')}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <FormatBold />
      </ToggleButton>
      <ToggleButton
        aria-label="italic"
        className={classes.toggleButton}
        selected={editor?.isActive('italic')}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <FormatItalic />
      </ToggleButton>
      <ToggleButton
        aria-label="strike"
        className={classes.toggleButton}
        selected={editor?.isActive('strike')}
        onClick={() => editor?.chain().focus().toggleStrike().run()}
      >
        <FormatStrikethrough />
      </ToggleButton>
      <ToggleButton
        aria-label="underline"
        className={classes.toggleButton}
        selected={editor?.isActive('underline')}
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
      >
        <FormatUnderlined />
      </ToggleButton>
      <ToggleButton
        aria-label="code"
        className={classes.toggleButton}
        selected={editor?.isActive('code')}
        onClick={() => editor?.chain().focus().toggleCode().run()}
      >
        <Code />
      </ToggleButton>
      <ToggleButton
        aria-label="bullet list"
        className={classes.toggleButton}
        selected={editor?.isActive('bulletList')}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      >
        <FormatListBulleted />
      </ToggleButton>
      <ToggleButton
        aria-label="ordered list"
        className={classes.toggleButton}
        selected={editor?.isActive('orderedList')}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      >
        <FormatListNumbered />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
