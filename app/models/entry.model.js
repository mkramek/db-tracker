import { model, Schema, SchemaTypes } from "mongoose";

const logEntrySchema = new Schema({
  timestamp: SchemaTypes.Date,
  action: SchemaTypes.String,
  schema: SchemaTypes.String,
  identity: SchemaTypes.String,
  record: {
    type: SchemaTypes.Map,
    of: SchemaTypes.Mixed,
  },
  old: {
    type: SchemaTypes.Map,
    of: SchemaTypes.Mixed,
  },
});

export const LogEntry = model("LogEntry", logEntrySchema);
