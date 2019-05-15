import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Hangman from "./Hangman";

// one snapshot per describe


describe("other", function() {

  //shallow smoke test
  it("renders using shallow", function() {
    shallow(<Hangman />);
  });
  
  //mount smoke test
  it("renders using mount", function() {
    mount(<Hangman />);
  });
  
  // snapshot test
  it("matches snapshot", function() {
    let wrapper = shallow(<Hangman />);
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();w
  });
  
  it("should change to img1 when incorrect guess", function() {
    let wrapper = shallow(<Hangman maxGuesses={6}/>);

    wrapper.setState({ answer: "apple"})
    wrapper
      .find("button[value='j']")
      .simulate("click", { target: { value: "j" } });
    expect(wrapper.html()).toContain("1.jpg")
  })
  
  it("image should remain same wiht correct guess", function() {
    let wrapper = shallow(<Hangman />);
    wrapper.setState({ answer: "apple"})
    wrapper
      .find("button[value='a']")
      .simulate("click", { target: { value: "a" } });
    expect(wrapper.html()).toContain("0.jpg")
  });
  
  
  it("image should disappear after 6 wrong guesses", function() {
    let wrapper = shallow(<Hangman />);
    wrapper.setState({ answer: "apple"})
    let wrong = "bcdfghijkmnoqrstuvwxyz".split("")
    
    console.log(toJson(wrapper), "look here");
    for (let ltr of wrong) {
      if (wrapper.html().includes("YOU LOSE")) {
        break;
      }
      wrapper.find(`button[value='${ltr}']`).simulate("click", { target: { value: `${ltr}`} })
    }
    expect(wrapper.html()).not.toContain("<img/>")
  })
})


describe("Lose", function() {
  it("shold show 'YOU LOSE' when you lose", function() {
    let wrapper = mount(<Hangman />);
    wrapper.setState({ answer: "apple"})
    let wrong = "bcdfghijkmnoqrstuvwxyz".split("")
  
    for (let ltr of wrong) {
      if (wrapper.html().includes("YOU LOSE")) {
        break;
      }
      wrapper.find(`button[value='${ltr}']`).simulate("click", { target: { value: `${ltr}`} })
    }
    console.log(wrapper.debug())
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
  });
})