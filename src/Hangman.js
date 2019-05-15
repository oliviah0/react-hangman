import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from "./words.js";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxGuesses: 6,
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    };
    console.log(this.state.answer)
    this.handleGuess = this.handleGuess.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  handleReset() {
    this.setState(st => ({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    }))
  }

  /** render: render game */
  render() {

    let activeGame = (
      <div>
        <img src={this.props.images[this.state.nWrong]} />
        <p className="Hangman-word">{this.guessedWord()}</p>
        <p>{this.generateButtons()}</p>
      </div>
    );

    let inactiveGame = (
      <p>YOU LOSE <br />
        Correct answer was: {this.state.answer}
      </p>
    );

    return (
      <div className="Hangman">
        {this.state.nWrong > this.props.maxGuesses ? inactiveGame : activeGame}
        <p>Wrong Guesses: {this.state.nWrong}</p>
        <button onClick={this.handleReset}>RESET GAME</button>
      </div>
    );
  }
}

export default Hangman;
