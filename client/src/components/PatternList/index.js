import React from "react";
import { Container, Row, Col } from "../Grid";

// Exporting both PatternList and PatternListItem from this file

// PatternList renders a bootstrap list item
export function PatternList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

// PatternListItem renders a bootstrap list item containing data from the recipe api call
export function PatternListItem(props) {
  console.log(`Props are: ${props.patternName}`);
  const {patternName, numberOfSteps, pattern, description} = props;
// }
  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-3 sm-2">
            <h5>{numberOfSteps}</h5>
          </Col>
          <Col size="xs-6 sm-7">
            <h3>{description}</h3>
          </Col>
          <Col size="xs-3 sm-3">
            <h5>{patternName}</h5>
            <p>
              pattern:{pattern.map(hit => {
                return (
                  hit + " "
              )})}
            </p>
          </Col>
        </Row>
      </Container>
    </li>
  );
}
