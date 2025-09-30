import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  public board: Chess;
  private startTime: Date;
  private moveNumber: number;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();
    this.moveNumber = 0;
    this.player1.send(
      JSON.stringify({ type: INIT_GAME, payload: { colour: "white" } })
    );
    this.player2.send(
      JSON.stringify({ type: INIT_GAME, payload: { colour: "black" } })
    );
  }

  makeMove(
    socket: WebSocket,
    payload: {
      from: string;
      to: string;
    }
  ) {
    // validate type of move

    if (this.moveNumber % 2 === 0 && socket !== this.player1) {
      console.error("It's not player 2's turn");
      return;
    }
    if (this.moveNumber % 2 === 1 && socket !== this.player2) {
      console.error("It's not player 1's turn");
      return;
    }

    try {
      this.board.move(payload);
    } catch (e) {
      console.error("Invalid move", payload);
      return;
    }

    if (this.moveNumber % 2 === 0) {
      this.player2.send(JSON.stringify({ type: MOVE, payload }));
    } else {
      this.player1.send(JSON.stringify({ type: MOVE, payload }));
    }
    this.moveNumber++;

    if (this.board.isGameOver()) {
      const gameOverMessage = {
        type: GAME_OVER,
        payload: {
          winner: this.board.isCheckmate()
            ? this.board.turn() === "w"
              ? "black"
              : "white"
            : "draw",
        },
      };

      this.player1.send(JSON.stringify(gameOverMessage));
      this.player2.send(JSON.stringify(gameOverMessage));

      return;
    }
  }
}
