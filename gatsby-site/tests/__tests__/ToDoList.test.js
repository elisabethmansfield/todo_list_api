/* https://www.gatsbyjs.org/docs/testing-components-with-graphql/
Testing components with GraphQL
*/

import React from "react";
import renderer from "react-test-renderer";
import ToDoList from "../../src/containers/ToDoList";

describe("ToDoList", () =>
  it("renders correctly", () => {

    // mock GraphQL data
    const data = {
    "todos": [
      {
        "_id": "5bf4e5e4232d4b185e963d4d",
        "name": "Hello World",
        "checked": false
      },
      {
        "_id": "6bf4e554e3dd4b385e9e3a4c",
        "name": "Go to Store",
        "checked": true
      },
      {
        "_id": "8af4e5e5432e3b181e9e3d3b",
        "name": "Buy Milk",
        "checked": false
      }
    ]};

    const tree = renderer
      .create(<ToDoList data={data} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
}));