import React from 'react';
import { useSelector } from 'react-redux';
import { Contact } from './contact';
import { ApplicationState } from './types';


function App() {
  const contactIds = useSelector((state: ApplicationState) => {
    return state.contacts.map(c => c.id);
  })
  return (
    <div className="App">
      <h1>
        Contacts
      </h1>
      <ul>
        {contactIds.map(c => <li><Contact contactId={c} /></li>)}
      </ul>
    </div>
  );
}

export default App;
