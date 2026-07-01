import mongoose, { Model, Schema } from "mongoose";
import type { IPermissionsUser } from "../typescript/interfaces/index.ts";

type RoleModel = Model<IPermissionsUser, {}, {}>;
const permissionSchema = new Schema<IPermissionsUser, RoleModel>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const Permission = mongoose.model<IPermissionsUser, RoleModel>(
  "Permission",
  permissionSchema,
);
