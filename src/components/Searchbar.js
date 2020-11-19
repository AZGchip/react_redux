import React, { Component } from 'react';

class Searchbar extends Component {
    constructor(props) {
        super(props)


    }
    render() {
        return (
            <div>
                <h2>Hacker News Searcher</h2>
                <form>
                    <input type="text"/>
                    <button onClick={this.callApi}>Search</button>
                    <br/>
                    <input type="radio" name="searchfilter" value="story" id="story" onChange={this.handleSearchChange} checked />
                    <label for="story">Story</label>
                    <br />
                    <input type="radio" name="searchfilter" value="poll" id="poll" onChange={this.handleSearchChange} />
                    <label for="story">Poll</label>
                    <br />
                    <input type="radio" name="searchfilter" value="author" id="author" onChange={this.handleSearchChange} />
                    <label for="story">Author</label>
                </form>
            </div>

        )
    }
}








export default Searchbar