"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.moveNumber = 0;
        this.player1.send(JSON.stringify({ type: messages_1.INIT_GAME, payload: { colour: "white" } }));
        this.player2.send(JSON.stringify({ type: messages_1.INIT_GAME, payload: { colour: "black" } }));
    }
    makeMove(socket, payload) {
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
        }
        catch (e) {
            console.error("Invalid move", payload);
            return;
        }
        if (this.moveNumber % 2 === 0) {
            this.player2.send(JSON.stringify({ type: messages_1.MOVE, payload }));
        }
        else {
            this.player1.send(JSON.stringify({ type: messages_1.MOVE, payload }));
        }
        this.moveNumber++;
        if (this.board.isGameOver()) {
            const gameOverMessage = {
                type: messages_1.GAME_OVER,
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
exports.Game = Game;
