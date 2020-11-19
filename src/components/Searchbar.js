import React, { Component } from 'react';


class Searchbar extends Component {

    //default search filter is "story"
    state = {
        searchtype: "",
        searchby: "?query=",
        text: "",
        searchResults: ""
    };

    // when search filter is changed
    handleSearchChange = (event) => {
        this.setState({ searchtype: event.target.value });
    };
    // when searchby selector is changed
    handleSearchByChange = (event) => {
        this.setState({ searchby: event.target.value });
    };

    handleText = (event) => {
        this.setState({ text: event.target.value })
    }

    // when search button is pressed
    buildAndCall = (event) => {
        // stops reload
        event.preventDefault();
        const defaultCall = "http://hn.algolia.com/api/v1/search"
        let text = this.state.text;
        let tag = this.state.searchtype;
        let searchBy = this.state.searchby;
        let query;
        if (text !== "" || text.replace(/\s/g, "") !== "") {
            console.log(tag)
            if (tag === "&author_") {
                query = defaultCall + searchBy + "" + tag + text
            }
            else {
                query = defaultCall + searchBy + text + tag
            }
            console.log("searching " + query);
        }
        else { console.log("fill in search bar") }
    };

    render() {
        return (
            <div>
                {/* title */}
                <h2>Hacker News Searcher</h2>
                <form>
                    {/* Radio buttons */}
                    <input type="radio" name="searchfilter" value="&tags=story" id="story" onChange={this.handleSearchChange} />
                    <label htmlFor="story">Story</label>
                    <br />
                    <input type="radio" name="searchfilter" value="&tags=poll" id="poll" onChange={this.handleSearchChange} />
                    <label htmlFor="poll">Poll</label>
                    <br />
                    <input type="radio" name="searchfilter" value="&tags=author_" id="author" onChange={this.handleSearchChange} />
                    <label htmlFor="author">Author</label>
                    <br />
                    {/* search box */}
                    <input type="text" onChange={this.handleText} />
                    {/* date/relevence selector */}
                    <select onChange={this.handleSearchByChange}>
                        <option value="?query=">Relevance</option>
                        <option value="_by_date?=">Date</option>
                    </select>
                    <button onClick={this.buildAndCall}>Search</button>

                </form>
                <p>http://hn.algolia.com/api/v1/search{this.state.searchby}{this.state.text}{this.state.searchtype}</p>
            </div>

        )
    }
}








export default Searchbar