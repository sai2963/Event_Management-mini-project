import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
export default function RegisterEventForm({ action, exploreEvent, EventId }) {
  const router = useRouter();
  function handleSubmit() {
    router.push(`/maine/upcoming-events/${EventId}/${EventId}/${EventId}`);
  }
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md bg-[#1a1a2e] rounded-2xl shadow-2xl shadow-purple-900/30 p-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
          >
            {exploreEvent.event} Registration
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-300 text-center mb-6"
          >
            <p className="text-xl font-semibold">
              Date: {exploreEvent.eventdate}
            </p>
          </motion.div>
          <form className="space-y-4" action={action} onSubmit={handleSubmit}>
            {[
              { name: "name", label: "Your Name", type: "text" },
              { name: "email", label: "Email Address", type: "email" },
              { name: "phone", label: "Contact Number", type: "tel" },
              {
                name: "organization",
                label: "Organization/College",
                type: "text",
              },
            ].map((field) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  required
                  className="w-full px-4 py-2 bg-[#252642] border border-[#3a3a5e] rounded-xl text-white 
                focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                />
                <input type="hidden" name="event" value={exploreEvent.event} />
              </motion.div>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 
            rounded-xl text-white font-bold hover:from-purple-700 hover:to-pink-700 
            transition-all duration-300 transform hover:shadow-xl hover:shadow-purple-500/30"
            >
              Register Now
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
}
