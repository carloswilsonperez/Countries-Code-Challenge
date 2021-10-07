import React from "react";
import CountryCard from './Card';

import './Country.css';

export default function CountryArea(props) {
  console.log("---> " +  props.countries);
  return (
    <div className="country-region">
      {props.countries.map(country => {
        return (
          <CountryCard country={country} key={country.name}></CountryCard>
        );
      })}
    </div>
  );
}