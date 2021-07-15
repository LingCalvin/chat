import { Divider, IconButton } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MessageEditorMenuBar from './message-editor.-menu-bar';
import useStyles from './message-editor.styles';

export default function MessageEditor() {
  const classes = useStyles();
  const editor = useEditor({ extensions: [StarterKit, Underline] });

  return (
    <div className={classes.root}>
      <EditorContent className={classes.editor} editor={editor} />
      <IconButton aria-label="send" className={classes.sendButton}>
        <Send />
      </IconButton>
      <Divider className={classes.divider} />
      <MessageEditorMenuBar className={classes.menuBar} editor={editor} />
    </div>
  );
}
