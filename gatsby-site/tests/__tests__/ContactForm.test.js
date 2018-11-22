import React from "react";
import renderer from "react-test-renderer";
import ContactForm from "../../src/containers/ContactForm";

describe("ContactForm", () =>
  it("renders correctly", () => {

    const webhook = '';
    const tree = renderer
      .create(<ContactForm webhook={webhook} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
}));