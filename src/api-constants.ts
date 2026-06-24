import { inject } from '@angular/core';

import { Config }
from './assets/environments/config';

export class ApiConstants {

  readonly #config =
    inject(Config);

  // ---------------- Base URLs ----------------

  readonly authenticationBaseURL =
    this.#config.authenticationBaseURL;

  readonly baseURL =
    this.#config.baseURL;

  // ---------------- Authentication ----------------

  readonly getAllUsers =
    '/getAllUsers';

  readonly getUserById =
    '/getUserById';

  readonly addUsers =
    '/addUsers';

  readonly updateUser =
    '/updateUser';

  readonly deleteUser =
    '/deleteUser';

  readonly validateUser =
    '/validateUser';

  readonly refresh =
    '/refresh';

  readonly changePassword =
    '/changePassword';

  // ---------------- Roles ----------------

  readonly getAllRoles =
    '/getAllRoles';

  readonly getRoleById =
    '/getRoleById';

  readonly addRoles =
    '/addRoles';

  readonly updateRole =
    '/updateRole';

  readonly deleteRole =
    '/deleteRole';

  // ---------------- Projects ----------------

  readonly getByProject =
    '/getByProject';

  readonly getAllProjects =
    '/getAllProjects';

  readonly getProjectById =
    '/getProjectById';

  readonly addProjects =
    '/addProjects';

  readonly updateProject =
    '/updateProject';

  readonly deleteProject =
    '/deleteProject';

  readonly getAllMappedProjects =
    '/getAllMappedProjects';

  readonly getAllUserProjectMappings =
    '/getAllUserProjectMappings';

  readonly updateUserProjectMappings =
    '/updateUserProjectMappings';

  // ---------------- Games ----------------

  readonly getAllGames =
    '/getAllGames';

  readonly addGames =
    '/addGames';

  readonly updateGame =
    '/updateGame';

  readonly deleteGames =
    '/deleteGames';

  // ---------------- Debts ----------------

  readonly getAllDebts =
    '/getAllDebts';

  readonly addDebts =
    '/addDebts';

  readonly updateDebt =
    '/updateDebt';

  readonly deleteDebts =
    '/deleteDebts';

  // ---------------- Trading ----------------

  readonly generateSession =
    '/generateSession';

  readonly gainers =
    '/gainers';

  readonly losers =
    '/losers';

  readonly marketHub =
    '/marketHub';

  // ---------------- Angel One ----------------

  readonly loginToAngelOne =
    '/login-to-angel';

  readonly refreshAngelToken =
    '/refresh-angel-token';

  readonly getAvailableCash =
    '/get-available-cash';

  readonly ownedHoldings =
    '/owned-holdings';

  // ---------------- Dashboard ----------------

  readonly dashboardSummary =
    '/dashboard';

  readonly getTradingState =
    '/trading-state';

  // ---------------- Auto Trading ----------------

  readonly enableAutoTrading =
    '/enable-auto-trading';

  readonly disableAutoTrading =
    '/disable-auto-trading';

  readonly updateStrategy =
    '/update-strategy';

  readonly togglePaperTrading =
    '/toggle-paper-trading';

  readonly resetTradingState =
    '/reset-trading-state';

  // ---------------- Helpers ----------------

  getUrl(
    endpoint: string,

    isAuth = false
  ): string {

    return isAuth

      ? `${this.authenticationBaseURL}${endpoint}`

      : `${this.baseURL}${endpoint}`;
  }
}