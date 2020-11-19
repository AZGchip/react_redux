import React, { Component } from 'react';


class Searchbar extends Component {

    //default search filter is "story"
    state = {
        searchtype: "story",
        searchby: "relevance"
    };

    // when search filter is changed
    handleSearchChange = (event) => {
        this.setState({ searchtype: event.target.value });
    };
    // when searchby selector is changed
    handleSearchByChange = (event) => {
        this.setState({ searchby: event.target.value });
    };

    // when search button is pressed
    buildAndCall = (event) => {
        // stops reload
        event.preventDefault();
        const defaultApi = "http://hn.algolia.com/api/v1/search";

    };

    render() {
        return (
            <div>
                {/* title */}
                <h2>Hacker News Searcher</h2>
                <form>
                    {/* Radio buttons */}
                    <input type="radio" name="searchfilter" value="story" id="story" onChange={this.handleSearchChange} />
                    <label for="story">Story</label>
                    <br />
                    <input type="radio" name="searchfilter" value="poll" id="poll" onChange={this.handleSearchChange} />
                    <label for="poll">Poll</label>
                    <br />
                    <input type="radio" name="searchfilter" value="author" id="author" onChange={this.handleSearchChange} />
                    <label for="author">Author</label>
                    <br />
                    {/* search box */}
                    <input type="text" />
                    {/* date/relevence selector */}
                    <select onChange={this.handleSearchByChange}>
                        <option value="relevance">Relevance</option>
                        <option value="date">Date</option>
                    </select>
                    <button onClick={this.buildAndCall}>Search</button>

                </form>
                <p>search {this.state.searchtype} {this.state.searchby}</p>
            </div>

        )
    }
}








export default Searchbar