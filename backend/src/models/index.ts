import { Sequelize } from "sequelize";

import { createMediaTable, Media } from "./media.model";

import { createRefreshTokenTable } from "./refresh_token.model";
import { createUserTable } from "./user.model";
import { createUserAddressTable } from "./user_address.model";
import { Featuring, initFeaturingModel } from "./featuring.model";

export const createTables = (sequelize: Sequelize) => {
  createUserTable(sequelize);
  createUserAddressTable(sequelize);
  createRefreshTokenTable(sequelize);
  createMediaTable(sequelize);
  initFeaturingModel(sequelize);

  associateModels();
};

export const associateModels = () => {
  // A Featuring uses two Media records: one for desktop and one for mobile
  Featuring.belongsTo(Media, { as: "desktopMedia", foreignKey: "desktopId" });
  Featuring.belongsTo(Media, { as: "mobileMedia", foreignKey: "mobileId" });
};
