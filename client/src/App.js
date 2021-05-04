import React, { useState } from "react";
import Jumbotron from "./components/Jumbotron";
import Nav from "./components/Nav";
import Input from "./components/Input";
import Button from "./components/Button";
import API from "./utils/API";
// import { RecipeList, RecipeListItem } from "./components/RecipeList";
import { PatternList, PatternListItem } from "./components/PatternList";
import { Container, Row, Col } from "./components/Grid";

function App() {

  const [patterns, setPatterns] = useState([]);
  const [patternSearch, setPatternSearch] = useState("");

  const handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { value } = event.target;
    setPatternSearch(value);
  };

  const handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    API.getPatterns(patternSearch)
      .then(res => {
        console.log(res.data)
        setPatterns(res.data)
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Nav />
      <Jumbotron />
      <Container>
        <Row>
          <Col size="md-12">
            <form>
              <Container>
                <Row>
                  <Col size="xs-9 sm-10">
                    <Input
                      name="patternSearch"
                      value={patternSearch}
                      onChange={handleInputChange}
                      placeholder="Search For a pattern"
                    />
                  </Col>
                  <Col size="xs-3 sm-2">
                    <Button
                      onClick={handleFormSubmit}
                      type="success"
                      className="input-lg"
                    >
                        Search
                    </Button>
                  </Col>
                </Row>
              </Container>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="xs-12">
            <h1>Render patterns Here</h1>
            <PatternList>
              {patterns.map(pattern => {
                return (
                <PatternListItem 
                  key={pattern.patternName}
                  patternName={pattern.patternName}
                  numberOfSteps={pattern.numberOfSteps}
                  pattern={pattern.pattern}
                  description={pattern.description} 
                />
                );
              })}
            </PatternList>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default App;
