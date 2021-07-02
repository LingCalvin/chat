import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../../interfaces/contact';

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = { contacts: [] };

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      const existingContact = state.contacts.find(
        (contact) => contact.id === action.payload.id,
      );
      if (!existingContact) {
        // Add the contact if it doesn't already exist
        state.contacts.push(action.payload);
      } else {
        // Update the contacts username if it does exist
        existingContact.username = action.payload.username;
      }
    },
  },
});

export const { addContact } = contactsSlice.actions;
const contactsReducer = contactsSlice.reducer;
export default contactsReducer;
