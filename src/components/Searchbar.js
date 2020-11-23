import React, { Component } from 'react';
import { connect } from "react-redux"


class Searchbar extends Component {
    constructor(props) {
        super(props)
        // searchby is default by query
        // local state used for search filters
        this.state = {
            searchtype: "",
            searchby: "?query=",
            searchResults: []
        };
    }



    // when search filter is changed
    handleSearchChange = (event) => {
        //update local state for tags
        this.setState({ searchtype: event.target.value });
    };

    // when searchby selector is changed
    handleSearchByChange = (event) => {
        //update local state for searchby
        this.setState({ searchby: event.target.value });
    };

    //when text is entered
    handleTextChange = (event) => {
        //update redux state for text
        this.props.onChangeText(event.target.value);

    }


    // when search button is pressed
    buildAndCall = (event) => {
        // stops default reload on form submit
        event.preventDefault();
        //update redux state for searched text
        this.props.onAddSearch()

        //basic api call 
        const defaultCall = "http://hn.algolia.com/api/v1/search"
        // assigns variables using the state of the search bar and redux state
        let text = this.props.text;
        let tag = this.state.searchtype;
        let searchBy = this.state.searchby;
        let query;
        //makes sure searchbar isnt empty before searching 
        if (text !== "" || text.replace(/\s/g, "") !== "") {
            // builds api query based on local state 
            if (tag === "&tags=author_") {
                query = defaultCall + searchBy + tag + text
            }
            else {
                query = defaultCall + searchBy + text + tag
            }
            console.log("searching " + query);
            //api call
            fetch(query)
                .then(res => res.json())
                .then(
                    (result) => {
                        //returned data is formated and saved to state
                        let results = []
                        results = result.hits.map(data =>
                            <div key={data.title} className="col-md-3 m-2 border-dark">
                                <h3>{data.title}</h3>
                                <h4>by {data.author}</h4>
                                <p>{data.created_at}</p>
                            </div>)
                        this.setState({ searchResults: results })

                    },
                    //if err
                    (error) => {
                        this.setState({
                            error
                        });
                    }
                )


        }
        // if text box is empty, tell user to fill in box before searching 
        else { this.setState({ searchResults: <div className="text-danger row">please fill in search box</div> }) }
    };

    render() {

        return (
            // page contents
            <div className="row">

                {/* title */}
                <h2 className="row text-center">Hacker News Searcher</h2>
                <hr />

                <div className="row">
                    {/* Search form */}
                    <form className="col-md-8">

                        {/* Radio buttons for search tag selection*/}
                        <input type="radio" name="searchfilter" value="&tags=story" id="story" onChange={this.handleSearchChange} />
                        <label htmlFor="story">Story</label>
                        <br />
                        <input type="radio" name="searchfilter" value="&tags=poll" id="poll" onChange={this.handleSearchChange} />
                        <label htmlFor="poll">Poll</label>
                        <br />
                        <input type="radio" name="searchfilter" value="&tags=author_" id="author" onChange={this.handleSearchChange} />
                        <label htmlFor="author">Author</label>
                        <br />

                        {/* search text box */}
                        <input type="text" onChange={this.handleTextChange} value={this.props.text} />

                        {/* date/relevence selector */}
                        <select onChange={this.handleSearchByChange}>
                            <option value="?query=">Relevance</option>
                            <option value="_by_date?=">Date</option>
                        </select>

                        {/* Submit search button */}
                        <button onClick={this.buildAndCall}>Search</button>

                    </form>

                    {/* Saved redux state box */}

                    <div className="col-md-4 ">
                        <h4>Previous Searches</h4>
                        <div className="scroll">
                            {this.props.searches && this.props.searches.map(text => (
                                <div value={text} key={text}> {text}</div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* api results box */}
                <div className="row ">
                    {this.state.searchResults}
                </div>

            </div>

        )
    }
}
//allows the component to access redux state by adding it to props
const mapStatetoProps = (state) => {
    return {
        text: state.text,
        searches: state.searches
    }
}
//allows the component to manipulate the redux state
const mapDispatchtoProps = (dispatch) => {
    return {
        onChangeText: (text) => dispatch({ type: "CHANGE_TEXT", text: text }),
        onAddSearch: () => dispatch({ type: "ADD_SEARCH" }),
    }
}






export default connect(mapStatetoProps, mapDispatchtoProps)(Searchbar);