import React, { Component } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import Wish from "./Wish";
import WishForm from "./WishForm";
import Error from "./Error";

const WISH_ENDPOINT = "api/wish";
const UNKOWN_ERROR = "unkown error... sorry...";

const WishesContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Box = styled.span`
  margin-bottom: 1rem;
  display: inline-block;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wishes: [],
      offset: 0,
      noMoreWishes: false,
      loading: true,
    };

    this.getWishes = this.getWishes.bind(this);
    this.postWish = this.postWish.bind(this);
  }

  componentDidMount() {
    this.getWishes();
  }

  getWishes() {
    this.setState({ loading: true });
    fetch(WISH_ENDPOINT)
      .then((res) => {
        if (!res.ok)
          return this.setState({ loading: false, error: UNKOWN_ERROR });
        return res.json();
      })
      .then((data) => {
        this.setState({
          wishes: data.wishes,
          offset: data.wishes.length,
          loading: false,
        });
      });
  }

  getMoreWishes() {
    this.setState({ loading: true });

    let url = new URL(WISH_ENDPOINT),
      params = { offset: this.state.offset };
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    fetch(url)
      .then((res) => {
        if (!res.ok)
          return this.setState({ loading: false, error: UNKOWN_ERROR });
        res.json();
      })
      .then((data) => {
        if (data.wishes.length === 0)
          return this.setState({ loading: false, noMoreWishes: true });

        this.setState({
          wishes: this.state.wishes.unshift(...data.wishes),
          offset: this.state.offset + data.wishes.length,
          loading: false,
        });
      });
  }

  postWish(wish) {
    this.setState({ error: "" });

    fetch(WISH_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wish),
    }).then((response) => {
      if (response.status === 500)
        return this.setState({ error: UNKOWN_ERROR });
      response.json().then((data) => {
        if (data.error) return this.setState({ error: data.error });
        this.getWishes();
      });
    });
  }

  renderWishesSkeleton() {
    return <Skeleton width={600} height={150} count={3} wrapper={Box} />;
  }

  render() {
    return (
      <r-grid columns="6">
        <r-cell span="2" span-s="row">
          <header>
            <h1>when this is all over...</h1>
            <p>what do you want to do when quarantine is over?</p>
          </header>
          {this.state.error ? <Error error={this.state.error} /> : null}
          <WishForm onSubmit={this.postWish} />
        </r-cell>
        <r-cell span="4" span-s="row">
          <WishesContainer>
            {this.state.loading ? (
              this.renderWishesSkeleton()
            ) : this.state.wishes.length ? (
              <>
                {this.state.wishes.map((wish) => (
                  <Wish {...wish} key={wish.id} />
                ))}
              </>
            ) : (
              <div>no hay wishes...</div>
            )}
          </WishesContainer>
        </r-cell>
      </r-grid>
    );
  }
}

export default App;
