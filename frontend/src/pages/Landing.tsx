import { motion } from "framer-motion";
import {
  ChevronRight as ChessKnight,
  PlayCircle,
  Notebook as Robot,
  Trophy,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen text-white">
      {/* Navigation */}
      <nav className="bg-slate-900/50 backdrop-blur-sm p-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <ChessKnight className="h-10 w-10 text-green-500" />
              <span className="ml-2 text-3xl font-bold">Chess</span>
            </motion.div>
            <div className="flex space-x-4">
              <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md font-medium transition-colors">
                Sign Up
              </button>
              <button className="text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-md font-medium transition-colors">
                Log In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl font-bold mb-6">
              Play Chess Online
              <br />
              <span className="text-green-500">on the #2 Site!</span>
            </h1>
            <p className="text-gray-400 text-xl mb-8">
              Join millions of players from around the world and experience the
              joy of chess.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2 transition-colors cursor-pointer"
              onClick={() => navigate("/game")}
            >
              <PlayCircle className="h-6 w-6" />
              <span>Play Now</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 shadow-xl">
              <img
                src="/chess.jpg"
                alt="Chess board"
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-slate-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-slate-800/50 p-6 rounded-xl"
            >
              <Users className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Play with Friends</h3>
              <p className="text-gray-400">
                Challenge your friends to a game or join a tournament.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="bg-slate-800/50 p-6 rounded-xl"
            >
              <Robot className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Train with AI</h3>
              <p className="text-gray-400">
                Practice against different levels of AI opponents.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="bg-slate-800/50 p-6 rounded-xl"
            >
              <Trophy className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Join Tournaments</h3>
              <p className="text-gray-400">
                Compete in daily tournaments and win prizes.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-4xl font-bold text-green-500"
            >
              100M+
            </motion.div>
            <div className="text-gray-400 mt-2">Games Played</div>
          </div>
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl font-bold text-green-500"
            >
              50M+
            </motion.div>
            <div className="text-gray-400 mt-2">Members</div>
          </div>
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-4xl font-bold text-green-500"
            >
              200+
            </motion.div>
            <div className="text-gray-400 mt-2">Countries</div>
          </div>
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-4xl font-bold text-green-500"
            >
              24/7
            </motion.div>
            <div className="text-gray-400 mt-2">Support</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
