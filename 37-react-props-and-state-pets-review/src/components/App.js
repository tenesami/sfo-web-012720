import React from 'react';

import Filters from './Filters';
import PetBrowser from './PetBrowser';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    };
  }

  onChangeType = event => {
    const selectedType = event.target.value;

    this.setState({
      filters: {
        type: selectedType
      }
    });
  };

  onFindPetsClick = () => {
    const petType = this.state.filters.type;
    const url = `/api/pets${petType === 'all' ? '' : '?type=' + petType}`;

    fetch(url)
      .then(resp => resp.json())
      .then(pets => this.setState({ pets: pets }));
  };

  onAdoptPet = petId => {
    const newPetsArray = this.state.pets.map(pet => {
      if (pet.id === petId) {
        return { ...pet, isAdopted: true };
      } else {
        return pet;
      }
    });

    this.setState({ pets: newPetsArray });
  };

  render() {
    const { pets } = this.state;

    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
