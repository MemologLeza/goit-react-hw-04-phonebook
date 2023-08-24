import PropTypes from 'prop-types';
import styled from './ContacrForm.module.css';
const { Component } = require('react');
class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createContact(this.state); ///
    this.setState({
      name: '',
      number: '',
    });
  };
  render() {
    return (
      <form className={styled.form} onSubmit={this.handleSubmit}>
        <label htmlFor="name">
          Name
          <input
            className={styled.input}
            onChange={this.handleChange}
            value={this.state.name}
            type="text"
            name="name"
            id="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label htmlFor="number">
          Number
          <input
            className={styled.input}
            onChange={this.handleChange}
            value={this.state.number}
            type="tel"
            name="number"
            id="number"
            pattern="\\+?\\d{1,4}?[ .\\-\\s]?\\(?\\d{1,3}?\\)?[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button type="submit" className={styled.button}>
          Add contact
        </button>
      </form>
    );
  }
}
ContactForm.propTypes = {
  createContact: PropTypes.func.isRequired,
};
export default ContactForm;
