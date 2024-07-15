import createSubscriber from "pg-listen";
import { env } from "./config/index.js";
import mongoose from "mongoose";
import { LogEntry } from "./models/entry.model.js";
import readline from "node:readline";

/**
 * @typedef {object} NotificationPayload
 * @property {*} timestamp
 * @property {string} action
 * @property {string} schema
 * @property {string} identity
 * @property {Record<string, any>} record
 * @property {Record<string, any>} old
 */

// Accepts the same connection config object that the "pg" package would take
const subscriber = createSubscriber({ connectionString: env.SOURCE_DATABASE_URL });

/**
 * @param {NotificationPayload} payload
 */
function handleNotification(payload) {
  const entry = new LogEntry({ ...payload });
  entry.save().then(() => {
    console.log(`NEW OP: ${entry.action} @ ${entry.schema}.${entry.identity} :: ${entry.timestamp}`);
  });
}

subscriber.notifications.on(env.CHANNEL_NAME, handleNotification);

subscriber.events.on("error", (error) => {
  console.error("Fatal database connection error:", error);
  process.exit(1);
});

if (process.platform === "win32") {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("SIGINT", function() {
    console.log("Received SIGINT, shutting down...");
    process.emit("SIGINT");
  });
}

process.on("SIGINT", () => {
  console.log("Closing target DB connection...");
  mongoose.disconnect().then(() => {
    console.log("Target DB connection closed");
    process.exit(0);
  });
});

process.on("exit", () => {
  console.log("Closing subscriber connection...");
  subscriber.close().then(() => {
    console.log("Subscriber connection closed");
  });
});

(async () => {
  await subscriber.connect().then(() => {
    console.log("Connected to PSQL's LISTEN subscriber");
  }).catch(console.error);

  await subscriber.listenTo(env.CHANNEL_NAME);

  mongoose.connect(env.TARGET_DATABASE_URL).then(() => {
    console.log("Connected to MongoDB");
  }).catch(console.error);
})();
