import { motion } from "framer-motion";

export const Header = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="text-center space-y-4"
  >
    <div className="flex justify-center mb-4">
      <img
        src="/lovable-uploads/7b514a3e-c813-4f7a-81c5-3ead9d291f8b.png"
        alt="Een kameel die door een kantoor rent"
        className="w-48 h-36 md:w-64 md:h-48 object-contain shadow-lg rounded-lg"
      />
    </div>
    <h1 className="text-4xl font-bold tracking-tight">Kamelenjacht</h1>
    <p className="text-xl text-muted-foreground">
      maak van de dal-dag een top-dag
    </p>
  </motion.div>
);