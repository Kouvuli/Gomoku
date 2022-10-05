import React, { useState } from "react";
import Board from "./Board";
import { calculateWinner } from "../utils";
import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
const Game = () => {
  const [state, setState] = useState({
    history: [
      {
        squares: Array(9).fill(null),
        moveLocation: "",
      },
    ],
    xIsNext: true,
    stepNumber: 0,
  });
  //   const [history, setHistory] = useState([
  //     { squares: Array(9).fill(null), moveLocation: "" },
  //   ]);
  //   const [stepNumber, setStepNumber] = useState(0);
  //   const [isClear, setIsClear] = useState(false);

  //   [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[state.history.length - 1];
    const squares = current.squares.slice();

    // console.log(current);

    if (squares[i] != null || calculateWinner(squares)) {
      return;
    }
    const gameSize = Math.sqrt(state.history[0].squares.length);
    const moveLocation = [
      Math.floor(i / gameSize + 1),
      (i % gameSize) + 1,
    ].join(", ");

    squares[i] = state.xIsNext ? "X" : "O";
    setState((prevState) => {
      return {
        ...prevState,
        history: history.concat([
          {
            squares,
            moveLocation,
          },
        ]),
        xIsNext: !state.xIsNext,
        stepNumber: history.length,
      };
    });
  };
  const jumpTo = (move) => {
    setState((state) => {
      return {
        ...state,
        xIsNext: move % 2 ? false : true,
        stepNumber: move,
      };
    });
  };

  const restart = () => {
    setState({
      history: [
        {
          squares: Array(9).fill(null),
          moveLocation: "",
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    });
  };
  const history = state.history;
  const current = history[state.stepNumber];
  const winner = calculateWinner(current.squares);

  let status;

  if (winner) {
    status = "Winner is:  ";
  } else if (state.stepNumber === 9) {
    status = "Draw";
  } else {
    status = "Next player is: ";
  }
  console.log(state.xIsNext, status === "Draw");
  const moves = history.map((step, move) => {
    const desc = move > 0 ? `Move #${move} (${step.moveLocation})` : "";

    return (
      <>
        {move > 0 && (
          <ListItem sx={{ paddingX: "0", paddingY: "0" }} key={move}>
            <ListItemButton href="#" onClick={() => jumpTo(move)}>
              {desc}
            </ListItemButton>
          </ListItem>
        )}
      </>
    );
  });

  let bgColor;
  if (winner) {
    bgColor = "#f9e076";
  } else {
    if (state.xIsNext) {
      bgColor = "#fccbd1";
    } else {
      bgColor = "#e3f2fd";
    }
  }
  return (
    <div>
      <Container>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <h1
              style={{
                color: "#1976d2",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              GOMOKU GAME
            </h1>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="game">
              <Board
                squares={current.squares}
                onClick={(i) => handleClick(i)}
                winner={winner && winner.winnerLocation}
                current={current}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="game-info">
              <Paper
                sx={{
                  backgroundColor: bgColor,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p style={{ fontWeight: 600 }}>{status}</p>
                {state.xIsNext && status !== "Draw" && !winner && (
                  <CloseIcon sx={{ color: "#f94449" }} />
                )}{" "}
                {!state.xIsNext && status !== "Draw" && !winner && (
                  <RadioButtonUncheckedIcon sx={{ color: "#1976d2" }} />
                )}
                {winner && winner.winnerPlayer === "O" && (
                  <RadioButtonUncheckedIcon sx={{ color: "#1976d2" }} />
                )}{" "}
                {winner && winner.winnerPlayer === "X" && (
                  <CloseIcon sx={{ color: "#f94449" }} />
                )}
                {/* {winner.winnerPlayer==="X" ? (
                  <CloseIcon sx={{ color: "#f94449" }} />
                ) : (
                  <RadioButtonUncheckedIcon sx={{ color: "#1976d2" }} />
                )} */}
              </Paper>
              <List sx={{ mt: 2, maxHeight: "400px", overflow: "auto" }}>
                {moves}
              </List>

              <Button
                startIcon={<RestartAltIcon />}
                sx={{
                  margin: "0 auto",
                  width: "50%",
                  mt: 2,
                  fontSize: 18,
                  backgroundColor: "#f94449",
                  textTransform: "capitalize",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#f01e2c!important" },
                }}
                onClick={() => restart()}
              >
                Restart
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Game;
