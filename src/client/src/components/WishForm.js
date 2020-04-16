import React, { Component } from "react";
import styled from "styled-components";

const WishFormContainer = styled.div`
  margin: 0.7rem 0;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  border: 0.1rem solid black;
  margin: 0.5rem;
  cursor: pointer;
  padding: 0.3rem 0.7rem;
  :hover {
    background-color: white;
    color: black;
  }
  :disabled {
    background-color: lightgrey;
    border: 0.1rem solid lightgrey;
    cursor: "not-allowed";
    pointer-events: none;
  }
`;

const TextArea = styled.textarea`
  border: 0.1rem solid black;
  padding: 0.3rem 0.7rem;
  resize: none;
  margin-bottom: 0.5rem;
  width: 90%;
`;

const Input = styled.input`
  border: 0.1rem solid black;
  padding: 0.3rem 0.7rem;
  width: 50%;
  margin-bottom: 0.5rem;
`;

/**
 * Renders a form to submit a wish.
 *
 * @prop onSubmit function that consumes a Wish (text, name)
 */
export default class WishForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      publisher: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value.toLowerCase(),
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit({
      text: this.state.text,
      publisher: this.state.publisher,
    });
  }

  render() {
    return (
      <WishFormContainer>
        <form onSubmit={this.handleSubmit}>
          <TextArea
            name="text"
            value={this.state.text}
            type="textarea"
            rows={3}
            maxLength={300}
            placeholder="your wish..."
            onChange={this.handleInputChange}
          />
          <Input
            name="publisher"
            value={this.state.publisher}
            type="text"
            placeholder="your name?"
            onChange={this.handleInputChange}
          ></Input>
          <Button type="submit" disabled={!this.state.text}>
            post
          </Button>
        </form>
      </WishFormContainer>
    );
  }
}
