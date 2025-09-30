//import { motion } from "framer-motion";
import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../pages/Game";

const getPieceSymbol = (type: PieceSymbol): string => {
  const symbols = {
    k: "♚",
    q: "♛",
    r: "♜",
    b: "♝",
    n: "♞",
    p: "♟",
  };
  return symbols[type];
};

const Chessboard = ({
  board,
  socket,
  chess,
  setBoard,
  started,
  colour,
  showValidMoves,
  turn,
  setTurn,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  chess: Chess;
  setBoard: any;
  started: boolean;
  colour: string;
  showValidMoves: boolean;
  turn: string;
  setTurn: (t: string) => void;
}) => {
  const [from, setFrom] = useState<Square | null>(null);
  const [validSquares, setValidSquares] = useState<String[]>([]);

  if (colour === "black") {
    return (
      <div className="w-full max-w-[600px] aspect-square bg-gray-700 p-2 rounded-lg">
        <div className="grid grid-cols-8 h-full w-full">
          {board
            .slice() // copy the board array
            .reverse() // reverse the ranks (rows) so black is at the bottom
            .map((rank, rankIndex) =>
              rank.map((square, fileIndex) => {
                const isLight = (rankIndex + fileIndex) % 2 === 0;
                // adjust the square calculation accordingly
                const sqr = (String.fromCharCode(97 + fileIndex) +
                  "" +
                  (rankIndex + 1)) as Square; // rankIndex + 1 because reversed
                return (
                  <div
                    key={`${rankIndex}-${fileIndex}`}
                    className={`
                  flex items-center justify-center text-4xl w-18 h-18
                  ${isLight ? "bg-[#e9e7b4]" : "bg-[#68804b]"} ${
                      showValidMoves &&
                      validSquares
                        .map((m) => (m.length > 2 ? (m = m.substring(1)) : m))
                        .includes(sqr)
                        ? "bg-amber-400/80"
                        : ""
                    }
                `}
                    onClick={() => {
                      if (!started) return;
                      if (turn === "white") return;
                      if (!from) {
                        setFrom(sqr);
                        setValidSquares(chess.moves({ square: sqr }));
                      } else {
                        socket.send(
                          JSON.stringify({
                            type: MOVE,
                            payload: { from: from, to: sqr },
                          })
                        );
                        try {
                          chess.move({ from, to: sqr });
                          setBoard(chess.board());
                          setTurn(colour === "black" ? "white" : "black");
                        } catch (e) {
                          console.log(e);
                        }
                        setFrom(null);
                        setValidSquares([]);
                      }
                    }}
                  >
                    {square?.type && (
                      <span
                        className={`${
                          square.color === "w" ? "text-white" : "text-gray-900"
                        } text-6xl cursor-pointer
                    `}
                      >
                        {getPieceSymbol(square?.type)}
                      </span>
                    )}
                  </div>
                );
              })
            )}
        </div>
      </div>
    );
  } else
    return (
      <div className="w-full max-w-[600px] aspect-square bg-gray-700 p-2 rounded-lg">
        <div className="grid grid-cols-8 h-full w-full">
          {board.map((rank, rankIndex) =>
            rank.map((square, fileIndex) => {
              const isLight = (rankIndex + fileIndex) % 2 === 0;
              const sqr = (String.fromCharCode(97 + fileIndex) +
                "" +
                (8 - rankIndex)) as Square;
              return (
                <div
                  key={fileIndex}
                  className={`
                flex items-center justify-center text-4xl w-18 h-18
                ${isLight ? "bg-[#e9e7b4]" : "bg-[#68804b]"} ${
                    showValidMoves &&
                    validSquares
                      .map((m) => (m.length > 2 ? (m = m.substring(1)) : m))
                      .includes(sqr)
                      ? "bg-amber-400/80"
                      : ""
                  }
              `}
                  onClick={() => {
                    if (!started) return;
                    if (turn === "black") return;
                    if (!from) {
                      setFrom(sqr);
                      setValidSquares(chess.moves({ square: sqr }));
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: { from: from, to: sqr },
                        })
                      );
                      try {
                        chess.move({ from, to: sqr });
                        setBoard(chess.board());
                        setTurn(colour === "black" ? "white" : "black");
                      } catch (e) {
                        console.log(e);
                      }
                      setFrom(null);
                      setValidSquares([]);
                    }
                  }}
                >
                  {square?.type && (
                    <span
                      className={`${
                        square.color === "w" ? "text-white" : "text-gray-900"
                      } text-6xl cursor-pointer
                      `}
                    >
                      {getPieceSymbol(square?.type)}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
};

export default Chessboard;
