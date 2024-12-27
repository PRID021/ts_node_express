import { Sequelize } from "sequelize";

import { createMediaTable, Media } from "./media.model";

import { createRefreshTokenTable } from "./refresh_token.model";
import { createUserTable } from "./user.model";
import { createUserAddressTable } from "./user_address.model";

export const createTables = (sequelize: Sequelize) => {
  createUserTable(sequelize);
  createUserAddressTable(sequelize);
  createRefreshTokenTable(sequelize);
  createMediaTable(sequelize);
};
