import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState, Contact as ContactType } from './types';
import axios from 'axios';

interface PropsFromState {
    contact: ContactType;
}

interface PropsFromDispatch {
    updateContact: (c: ContactType) => void;
}

interface State {
    isEditing: boolean;
    editingName: string;
}

class ContactComponent extends React.Component<PropsFromState & PropsFromDispatch, State> {
    constructor(props: PropsFromState & PropsFromDispatch) {
        super(props);
        this.state = {
            isEditing: false,
            editingName: props.contact.name
        };
    }

    save() {
        this.props.updateContact({ name: this.state.editingName } as ContactType);
        this.setState({ isEditing: false });
    }

    showEdit() {
        return <div>
            <label>Name
            <input type="text" value={this.state.editingName} onChange={e => this.setState({ editingName: e.target.value })} /></label>
            <button onClick={this.save}>Save</button>
            </div>;
    }

    showReadOnly() {
        return <div>
            <h3>{this.props.contact.name}</h3>
<dl>
<dt>email</dt>
            <dd>{this.props.contact.email}</dd>

            <dt>phone</dt>
            <dd>{this.props.contact.phone}</dd>

            <dt>company</dt>
            <dd>{this.props.contact.company}</dd></dl>
            <button onClick={() => this.setState({ isEditing: true })}>Edit</button>
        </div>
    }

    render() {
        if(this.state.isEditing) {
            return this.showEdit();
        }
        return this.showReadOnly();
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: { contactId: number }): PropsFromState => {
    return {
        contact: state.contacts.find(c => c.id === ownProps.contactId)!
    };
}

const mapStateToDispatch = (dispatch: any, ownProps: { contactId: number }): PropsFromDispatch => {
    return {
        updateContact: async (a: ContactType) => {
            const result = await axios.post(`/api/contacts/${ownProps.contactId}`, a);
            dispatch({ type: "update_contact", data: result.data });
        }
    };
}

export const Contact = connect(mapStateToProps, mapStateToDispatch)(ContactComponent);