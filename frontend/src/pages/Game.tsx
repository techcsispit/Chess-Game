import { motion } from "framer-motion";
import {
  ChevronRight as ChessKnight,
  Clock,
  Users,
  Trophy,
  Settings,
} from "lucide-react";
import Chessboard from "../components/Chessboard";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";
import { Chess } from "chess.js";

// TODO: move together , code repetition here
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

type Move = {
  m: string;
  n: number;
};

function Game() {
  const socket = useSocket();
  const [chess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);
  const [findgame, setFindgame] = useState(false);
  const [colour, setColour] = useState<"white" | "black">("white");
  const [showValidMoves, setShowValidMoves] = useState(true);
  const [moves, setMoves] = useState<Move[][]>([]);
  const [turn, setTurn] = useState("white");
  const [winner, setWinner] = useState<"white" | "black" | "draw" | null>(null);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case INIT_GAME:
          setWinner(null);
          setBoard(chess.board());
          setStarted(true);
          setFindgame(false);
          setColour(message.payload.colour);
          console.log("init game");
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          setTurn((prev) => (prev === "black" ? "white" : "black"));
          break;
        case GAME_OVER:
          const win = message.payload.winner;
          setWinner(win);
          setStarted(false);
          console.log("game over");
          break;
      }
    };
  }, [socket]);

  useEffect(() => {
    const rows: Move[][] = [];

    for (let i = 0; i < chess.history().length; i++) {
      const move1 = chess.history()[i];
      const move2 = chess.history()[i + 1];
      if (move1 && move2) {
        rows.push([
          { m: move1, n: i + 1 },
          { m: move2, n: i + 2 },
        ]);
        i++;
      } else {
        rows.push([{ m: move1, n: i + 1 }]);
      }
    }
    setMoves(rows);
  }, [chess, board]);

  if (!socket) return <div>Connecting...</div>;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <ChessKnight className="h-8 w-8 text-green-500" />
              <span className="ml-2 text-xl font-bold text-white">Chess</span>
            </motion.div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Guest2505222673</span>
              <button className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Game Area */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-white text-xl">Opponent</div>
                <div>
                  <button
                    className="text-green-500 text-md ml-30 font-mono"
                    onClick={() => setShowValidMoves(!showValidMoves)}
                  >
                    {showValidMoves ? "Hide Valid Moves" : "Show Valid Moves"}
                  </button>
                </div>
                <div className="text-green-500 text-2xl font-mono">10:00</div>
              </div>

              <div className="flex justify-between mt-4">
                <Chessboard
                  showValidMoves={showValidMoves}
                  colour={colour}
                  started={started}
                  chess={chess}
                  setBoard={setBoard}
                  board={board}
                  socket={socket}
                  turn={turn}
                  setTurn={setTurn}
                />

                {winner && <Gameover winner={winner} colour={colour} />}

                <div className="bg-gray-800 rounded-lg p-2 w-[150px]">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-green-500 text-md">White</div>
                    <div className="text-green-500 text-md">Black</div>
                  </div>
                  <div className="overflow-y-auto">
                    {moves.map((move, index) => (
                      <div key={index} className="flex justify-between">
                        <div className="text-white text-md">
                          {move[0].n}. {move[0].m}
                        </div>
                        <div className="text-white text-md">
                          {move[1] ? move[1].n + ". " + move[1].m : ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="text-white text-xl">Guest2505222673</div>
                <div className="text-green-500 text-2xl font-mono">10:00</div>
              </div>
            </div>
          </div>

          {/* Game Controls */}
          {!started && (
            <div className="col-span-12 lg:col-span-4 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-800 rounded-lg p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <button className="flex-1 text-white text-center py-2 hover:bg-gray-700 rounded-l-md transition-colors">
                    <Users className="h-6 w-6 mx-auto mb-1" />
                    New Game
                  </button>
                  <button className="flex-1 text-white text-center py-2 hover:bg-gray-700 rounded-none transition-colors">
                    <Trophy className="h-6 w-6 mx-auto mb-1" />
                    Games
                  </button>
                  <button className="flex-1 text-white text-center py-2 hover:bg-gray-700 rounded-r-md transition-colors">
                    <Users className="h-6 w-6 mx-auto mb-1" />
                    Players
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <div className="flex items-center bg-gray-700 rounded-md p-3 cursor-pointer hover:bg-gray-600 transition-colors">
                      <Clock className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-white">10 min</span>
                    </div>
                  </div>

                  <button
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-md transition-colors mt-5 mb-10"
                    onClick={() => {
                      socket.send(JSON.stringify({ type: INIT_GAME }));
                      setFindgame(true);
                    }}
                    disabled={findgame}
                  >
                    {findgame ? "Finding Game" : "Play"}
                  </button>

                  <div className="space-y-2">
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-md flex items-center justify-center space-x-2 transition-colors">
                      <Users className="h-5 w-5" />
                      <span>Play a Friend</span>
                    </button>
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-md flex items-center justify-center space-x-2 transition-colors">
                      <Trophy className="h-5 w-5" />
                      <span>Tournaments</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const Gameover = ({
  winner,
  colour,
}: {
  winner: string;
  colour: string;
}) => {
  return (
    <>
      {/* Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed top-[45%] left-[22%] ] w-full max-w-md bg-slate-800 border border-slate-850 rounded-lg p-6 z-50"
      >
        {winner === "draw" ? (
          <div className="text-green-500 text-2xl">Game Draw</div>
        ) : winner === colour ? (
          <div className="text-green-500 text-2xl">You Won</div>
        ) : (
          <div className="text-green-500 text-2xl">You Lost</div>
        )}
      </motion.div>
    </>
  );
};

export default Game;
