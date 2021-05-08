import React from "react";
import { Container, Row, Col } from "../Grid";
import "./styles.css";

// Exporting both PatternList and PatternListItem from this file

// PatternList renders a bootstrap list item
export function PatternList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

// PatternListItem renders a bootstrap list item containing data from the recipe api call
export function PatternListItem(props) {
  console.log(`Props are for the pattern: ${props.title}`);
  const {id, title, noteCount, trackList} = props;
// }
  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-3 sm-3">
            <h5>id:{id} {title}</h5>
          </Col>
          <Col size="xs-3 sm-2">
            <h5>{noteCount}</h5>
          </Col>
          <Col size="xs-6 sm-7">
            {trackList.map(item => {
            return (
              <div className="APIText" key={item.title}>
                <p>{JSON.stringify(item)}</p>
              </div>
            )})}
          </Col>
        </Row>
      </Container>
    </li>
  );
}
