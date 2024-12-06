import { motion } from "framer-motion";

export const Header = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="text-center space-y-4"
  >
    <h1 className="text-4xl font-bold tracking-tight">Kamelenjacht</h1>
    <p className="text-xl text-muted-foreground">
      maak van de dal-dag een top-dag
    </p>
  </motion.div>
);