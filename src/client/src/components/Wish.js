import React, { Component } from "react";
import styled from "styled-components";
import TimeAgo from "react-timeago";

const WishContainer = styled.div`
  margin: 1.5rem;
  padding: 0.75rem 1rem;
  border: 0.1rem solid black;
`;

const WishText = styled.p`
  margin-bottom: 0;
`;

const Publisher = styled.p`
  color: var(--darkGrey);
  font-size: 18px;

  @media only screen and (max-width: 1000px) {
    font-size: 14px;
  }
`;

class Wish extends Component {
  render() {
    return (
      <WishContainer>
        <WishText>{this.props.text}</WishText>
        <Publisher>
          {this.props.publisher ? (
            <>
              {this.props.publisher}
              {" · "}
              <TimeAgo date={this.props.created} />
            </>
          ) : (
            <>
              <TimeAgo date={this.props.created} />
            </>
          )}
        </Publisher>
      </WishContainer>
    );
  }
}

export default Wish;
