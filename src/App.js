import './App.css';

import React, { Component } from "react";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import CountryArea from './CountryArea';

const API_KEY = "544b86ae1421dc9b0b48ab7ba19fde2c";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], // The processed list of countries
      allCountries: [], // The raw list of all countries
      searchString: '',
      resultList: [],
      cardsInfo: []
    };
  }

  async componentDidMount() {
    // Get data
    const response = await fetch(
      `http://api.countrylayer.com/v2/all?access_key=${API_KEY}`
    );
    const data = await response.json();
    let countryList = data.map(item => {
      return {id: item.name, name: item.name};
    });
  
    this.setState({ allCountries: data, items: countryList });
  }

  handleOnSearch = (searchString, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    this.setState({ resultList: results, searchString });
    console.log('handleOnSearch ' + searchString, results)
  }

  handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  }

  handleOnSelect = (item) => {
    // the item selected
    console.log('Item chosen from list: ' + item);
    this.setState({ searchString: item.name });
  }

  handleOnFocus = () => {
    console.log('Focused');
  }

  formatResult = (item) => {
    return item;
  }

  handleSearchButton = () => {
    console.log('allCountries ' + this.state.allCountries.length + " / " + this.state.searchString);

    // Request the selected country (if any) and get the info for countries in resultList
    let allMatches = this.state.allCountries.filter(country => country.name.toLowerCase().includes(this.state.searchString.toLowerCase()));

    // Show the cards for the countries in the allMatches list.
    let cardsInfo = allMatches.map(country => ({
      name: country.name,
      region: country.region
    }));
    this.setState({ cardsInfo });
  }

  render() {
    return (
      <div className="App">
        <header className="search-container">
          <div style={{ width: 400 }}>
            <ReactSearchAutocomplete
              items={this.state.items}
              placeholder="Enter a Country Name..."
              maxResults={5}
              onSearch={this.handleOnSearch}
              onHover={this.handleOnHover}
              onSelect={this.handleOnSelect}
              onFocus={this.handleOnFocus}
              showIcon={false}
              autoFocus
              formatResult={this.formatResult}
              fuseOptions={{ keys: ["name"], minMatchCharLength: 3, threshold: 0 }}
              resultStringKeyName="name"
              styling={
                 {
                   width: '30%',
                   backgroundColor: 'white'
                }
              }
            />
          </div>
        </header>
        <button className="search-button" onClick={this.handleSearchButton}>Search</button>
        {this.state.items.length > 0 && <CountryArea countries={this.state.cardsInfo}/>}
      </div>
    );
  }
}
