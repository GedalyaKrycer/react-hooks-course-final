import React, { useState } from "react";
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle,
} from "react-icons/fa";
import PropTypes from "prop-types";
import Results from "./Results";
import { ThemeConsumer } from "../contexts/theme";
import { Link } from "react-router-dom";

function Instructions() {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className="instructions-container">
          <h1 className="center-text header-lg">Instructions</h1>
          <ol className="container-sm grid center-text battle-instructions">
            <li>
              <h3 className="header-sm">Enter two Github users</h3>
              <FaUserFriends
                className={`bg-${theme}`}
                color="rgb(255, 191, 116)"
                size={140}
              />
            </li>
            <li>
              <h3 className="header-sm">Battle</h3>
              <FaFighterJet
                className={`bg-${theme}`}
                color="#727272"
                size={140}
              />
            </li>
            <li>
              <h3 className="header-sm">See the winners</h3>
              <FaTrophy
                className={`bg-${theme}`}
                color="rgb(255, 215, 0)"
                size={140}
              />
            </li>
          </ol>
        </div>
      )}
    </ThemeConsumer>
  );
}

function PlayerInput({ label, onSubmit }) {
  const [username, setUsername] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(username);
  }

  function handleChange(event) {
    setUsername(event.target.value);
  }

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <form className="column player" onSubmit={handleSubmit}>
          <label htmlFor="username" className="player-label">
            {label}
          </label>
          <div className="row player-inputs">
            <input
              type="text"
              id="username"
              className={`input-${theme}`}
              placeholder="github username"
              autoComplete="off"
              value={username}
              onChange={handleChange}
            />
            <button
              className={`btn ${theme === "dark" ? "light-btn" : "dark-btn"}`}
              type="submit"
              disabled={!username}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </ThemeConsumer>
  );
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

function PlayerPreview({ username, onReset, label }) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className="column player">
          <h3 className="player-label">{label}</h3>
          <div className={`row bg-${theme}`}>
            <div className="player-info">
              <img
                className="avatar-small"
                src={`https://github.com/${username}.png?size=200`}
                alt={`Avatar for ${username}`}
              />
              <a href={`https://github.com/${username}`} className="link">
                {username}
              </a>
            </div>
            <button className="btn-clear flex-center" onClick={onReset}>
              <FaTimesCircle color="rgb(194, 57, 42)" size={26} />
            </button>
          </div>
        </div>
      )}
    </ThemeConsumer>
  );
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

const initialPlayers = {
  one: null,
  two: null,
};

export default function Battle() {
  const [players, setPlayers] = useState(initialPlayers);

  function handleSubmit(id, player) {
    setPlayers({
      ...players,
      [id]: player,
    });
  }
  function handleReset(id) {
    setPlayers({
      ...players,
      [id]: null,
    });
  }

  return (
    <React.Fragment>
      <Instructions />

      <div className="players-container">
        <h1 className="center-text header-lg">Players</h1>
        <div className="row space-around">
          {players.one === null ? (
            <PlayerInput
              label="Player One"
              onSubmit={(player) => handleSubmit("one", player)}
            />
          ) : (
            <PlayerPreview
              username={players.one}
              label="Player One"
              onReset={() => handleReset("one")}
            />
          )}

          {players.two === null ? (
            <PlayerInput
              label="Player Two"
              onSubmit={(player) => handleSubmit("two", player)}
            />
          ) : (
            <PlayerPreview
              username={players.two}
              label="Player Two"
              onReset={() => handleReset("two")}
            />
          )}
        </div>

        {players.one && players.two && (
          <Link
            className="btn dark-btn btn-space"
            to={{
              pathname: "/battle/results",
              search: `?playerOne=${players.one}&playerTwo=${players.two}`,
            }}
          >
            Battle
          </Link>
        )}
      </div>
    </React.Fragment>
  );
}
