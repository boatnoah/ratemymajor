import SearchBar from "@/components/SearchBar";
import { AnimatePresence, motion } from "framer-motion";
const HomePage = () => {
  return (
    <div className="flex justify-center px-6 py-2">
      <div className="flex flex-col items-start">
        <AnimatePresence>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                duration: 0.8,
                ease: "easeInOut",
              },
            }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 2 }}
            className="flex flex-col items-start mb-5"
          >
            <h1 className="text-4xl font-bold">Your Major,</h1>
            <h1 className="text-4xl font-bold">Your Future.</h1>
          </motion.div>
        </AnimatePresence>
        <SearchBar />
        <AnimatePresence>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                duration: 0.8,
                ease: "easeInOut",
              },
            }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 2 }}
            className="flex mt-10 w-[472px] gap-3"
          >
            <div className="flex flex-col gap-1 w-1/2">
              <h1 className="text-xl font-bold">Your future stars with</h1>
              <h1 className="text-xl font-bold">the right major.</h1>
              <p className="text-md font-thin">
                RateMyMajor is your ultimate resource for exploring academic
                programs, reading student reviews, and finding the perfect fit
                for your future.
              </p>
            </div>
            <div className="flex items-center">
              <img src="./src/assets/student.png" alt="Image by Free Pik" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomePage;
