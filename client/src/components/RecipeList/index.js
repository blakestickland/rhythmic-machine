import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";

// Exporting both RecipeList and RecipeListItem from this file

// RecipeList renders a bootstrap list item
export function RecipeList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export function RecipeListItem(props) {
  console.log(`Props are: ${props.title}`);
  const {title, href, ingredients, thumbnail} = props;
// }
  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={thumbnail || "https://via.placeholder.com/300"} />
          </Col>
          <Col size="xs-8 sm-9">
            <h3>{title}</h3>
            {/* <h3>Vegetable-Pasta Oven Omelet</h3> */}
            <p>
              Ingredients:{ingredients.map(ingredient => {
                return (
                  ingredient + " "
              )})}
            </p>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href={href}
            >
              Go to recipe!
            </a>
          </Col>
        </Row>
      </Container>
    </li>
  );
}