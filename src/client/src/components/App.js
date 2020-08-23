import React, { Component } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import Wish from "./Wish";
import WishForm from "./WishForm";
import Error from "./Error";
import InfiniteScroll from "react-infinite-scroller";

const WISH_ENDPOINT = "api/wish";
const UNKOWN_ERROR = "unknown error... sorry...";
const ITEMS_PER_PAGE = 10;

const WishesContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Box = styled.span`
  margin: 1.5rem;
  padding: 0.75rem 1rem;
  display: inline-block;
`;

const SourceCode = styled.p`
  color: lightgrey;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wishes: [],
      moreWishes: true,
      loading: false,
    };

    this.getWishes = this.getWishes.bind(this);
    this.loadWishes = this.loadWishes.bind(this);
    this.postWish = this.postWish.bind(this);
  }

  componentDidMount() {
    //this.getWishes();
  }

  getWishes() {
    this.setState({ loading: true });
    fetch(WISH_ENDPOINT)
      .then((res) => {
        if (!res.ok) {
          return this.setState({ loading: false, error: UNKOWN_ERROR });
        }
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

  /**
   * load wishes for infinite scrolling
   * @param {Integer} page the page to load
   */
  loadWishes(page) {
    const limit = ITEMS_PER_PAGE;
    const offset = (page - 1) * ITEMS_PER_PAGE;

    fetch(`${WISH_ENDPOINT}?limit=${limit}&offset=${offset}`)
      .then((res) => {
        if (!res.ok) return this.setState({ error: UNKOWN_ERROR });
        return res.json();
      })
      .then((data) => {
        if (!data || data.wishes.length === 0) {
          return this.setState({ moreWishes: false });
        }

        let wishes = this.state.wishes;
        wishes.push(...data.wishes);
        this.setState({
          wishes: wishes,
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
      if (response.status === 500) {
        return this.setState({ error: UNKOWN_ERROR });
      }
      response.json().then((data) => {
        if (data.error) return this.setState({ error: data.error });
        let wishes = this.state.wishes;
        wishes.unshift(data.wish);
        this.setState({
          wishes: wishes,
        });
      });
    });
  }

  renderWishesSkeleton(key) {
    return <Skeleton key={key} height={150} count={3} wrapper={Box} />;
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
          <SourceCode>
            see the <a href="https://github.com/palpfiction/quarantine-wishes">
              source code
            </a>
          </SourceCode>
        </r-cell>
        <r-cell
          span="4"
          span-s="row"
          innerRef={(ref) => (this.scrollParentRef = ref)}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadWishes}
            hasMore={this.state.moreWishes}
            loader={this.renderWishesSkeleton("infinite-scroller")}
            getScrollParent={() => this.scrollParentRef}
            element={WishesContainer}
          >
            <>
              {this.state.wishes.length === 0 && !this.state.moreWishes
                ? (
                  <Box>no wishes yet... dare to send the first one?</Box>
                )
                : (
                  this.state.wishes.map((wish) => (
                    <Wish {...wish} key={wish.id} />
                  ))
                )}
            </>
          </InfiniteScroll>
        </r-cell>
      </r-grid>
    );
  }
}

export default App;
