import React, { Component } from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  margin: 0.7rem 0;
  padding: 0.3rem 0.7rem;
  border: 0.1rem solid black;
  background: black;
  color: white;
  width: 90%;
`;

export default class Error extends Component {
  render() {
    return <ErrorContainer>{this.props.error}</ErrorContainer>;
  }
}
