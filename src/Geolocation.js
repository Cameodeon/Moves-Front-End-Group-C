import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./App.css";

class TutorialOfflineMap extends Component {

  state = {
    dict: {}
  };

  componentDidMount() {
    this.setState({ dict: this.props.dict });
  }
  render() {
    let dict = this.state.dict;
    document.title = dict.importantPlaces;

    return (
      <div className="container-fluid">
        <div className="container">
        <a
          className="btn btn-outline-dark"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.google.com/maps/`}
        >
          {dict.findYourself}
        </a>
          <br /><br />
          <h4>{dict.importantPlaces}</h4>
          <table class="table table-striped">
            <thead>
              <tr>
                <th></th>
                <th>{dict.name}</th>
                <th>{dict.address}</th>
                <th>{dict.latitude}</th>
                <th>{dict.longitude}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a
                    className="btn btn-default"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.google.com/maps/search/City-Sleep In (Hostel in Aarhus)/@56.1551956,10.2121883,18z/"
                  >
                    {dict.viewOnMap}
                  </a>
                  &nbsp;&nbsp;
                </td>
                <td>City-Sleep In (Hostel)</td>
                <td>Havnegade 20, 8000 Aarhus, Denmark</td>
                <td>56.1551956</td>
                <td>10.2121883</td>
              </tr>
              <tr>
                <td>

                  <a
                    className="btn btn-outline-light"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.google.com/maps/search/Clinique Assalam(Hospital)/@35.7700194,-5.809536,18z/"
                  >
                    {dict.viewOnMap}
                  </a>
                  &nbsp;&nbsp;
                </td>
                <td>Clinique Assalam (Hospital)</td>
                <td>Avenue d'Espagne, Tanger 90060, Morocco</td>
                <td>35.7700194</td>
                <td>-5.809536</td>
              </tr>
              <tr>
                <td>
                  <a
                    className="btn btn-default"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.google.com/maps/search/Police poste Castilla/@35.7672859,-5.8153725,18z/"
                  >
                    {dict.viewOnMap}
                  </a>
                  &nbsp;&nbsp;
                </td>
                <td>Police poste Castilla</td>
                <td>Place du Maroc, Tanger 90060, Morocco</td>
                <td>35.7672859</td>
                <td>-5.8153725</td>
              </tr>
              <tr>
                <td>
                  <a
                    className="btn btn-default"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.google.com/maps/search/Tanger City Mall/@35.7735013,-5.7870483,18z/"
                  >
                    {dict.viewOnMap}
                  </a>
                  &nbsp;&nbsp;
                </td>
                <td>Tanger City Mall</td>
                <td>Route Tanja El Balia, Tanger, Morocco</td>
                <td>35.7735013</td>
                <td>-5.7870483</td>
              </tr>
              <tr>
                <td>
                  <a
                    className="btn btn-default"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.google.com/maps/search/Tanger Ville Railway Station/@35.7715294,-5.7859866,18z/"
                  >
                    {dict.viewOnMap}
                  </a>
                  &nbsp;&nbsp;
                </td>
                <td>Tanger Ville Railway Station</td>
                <td>Tangier 90000, Morocco</td>
                <td>35.7715294</td>
                <td>-5.7859866</td>
              </tr>
              <tr>
                <td>
                  <a
                    className="btn btn-default"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.google.com/maps/search/Tangier Ibn Battuta Airport/@35.7265955,-5.9150683,18z/"
                  >
                    {dict.viewOnMap}
                  </a>
                  &nbsp;&nbsp;
                </td>
                <td>Tangier Ibn Battuta Airport</td>
                <td>Aéroport Tanger-Ibn Batouta, Tanger, Morocco</td>
                <td>35.7265955</td>
                <td>-5.9150683</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <br />
        <h2>
          {dict.howToUse}
        </h2>
        <br />
        <h4>{dict.step1}</h4>
        <p>{dict.installTheApp}</p>
        <br />
        <h4>{dict.step2}</h4>
        <p>
          {dict.openTheApp}
        </p>
        <div className="text-center"><img className="tutorialPNG" src="https://i.imgur.com/SrCrUpq.png" alt="" /></div>

        <h4>{dict.step3}</h4>
        <p>
          {dict.pressOfflineMaps}
        </p>
        <div className="text-center"><img className="tutorialPNG" src="https://i.imgur.com/UW84nJO.png" alt="" /></div>

        <h4>{dict.step4}</h4>
        <p>{dict.pressCustomMap}</p>
        <div className="text-center"><img className="tutorialPNG" src="https://i.imgur.com/7zz1qF2.png" alt="" /></div>

        <h4>
          {dict.step5}
        </h4>
        <p>
          {dict.resizeBoundaries}
        </p>
        <div className="text-center"><img className="tutorialPNG" src="https://i.imgur.com/9p21v7I.png" alt="" /></div>
      </div>
    );
  }
}

export default withRouter(TutorialOfflineMap);
