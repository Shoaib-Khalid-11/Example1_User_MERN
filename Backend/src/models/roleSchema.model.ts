import mongoose, { Model, Schema } from "mongoose";
import type { IRoleUser } from "../typescript/interfaces/index.ts";
import { RoleEnum } from "../typescript/enums/models.enum.ts";

type RoleModel = Model<IRoleUser, {}, {}>;

const roleSchema = new Schema<IRoleUser, RoleModel>(
  {
    name: {
      type: String,
      enum: RoleEnum,
      default: RoleEnum.User,
      unique: true,
      required: true,
    },

    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
  },
  {
    timestamps: true,
  },
);
export const Role = mongoose.model<IRoleUser, RoleModel>("Role", roleSchema);
