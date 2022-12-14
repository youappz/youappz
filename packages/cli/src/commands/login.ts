import { validate as validateEmail } from 'email-validator';
import chalk from 'chalk';
import hp from '../util/humanize-path';
import getArgs from '../util/get-args';
import logo from '../util/output/logo';
import prompt from '../util/login/prompt';
import doEmailLogin from '../util/login/email';
import { getCommandName, getPkgName } from '../util/pkg-name';
import getGlobalPathConfig from '../util/config/global-path';
import { writeToAuthConfigFile, writeToConfigFile } from '../util/config/files';
import Client from '../util/client';
import { LoginResult } from '../util/login/types';

const help = () => {
  console.log(`
  ${chalk.bold(`${logo} ${getPkgName()} login`)} <email or team>

  ${chalk.dim('Options:')}

    -h, --help                     Output usage information
    -A ${chalk.bold.underline('FILE')}, --local-config=${chalk.bold.underline(
    'FILE'
  )}   Path to the local ${'`appz.json`'} file
    -Q ${chalk.bold.underline('DIR')}, --global-config=${chalk.bold.underline(
    'DIR'
  )}    Path to the global ${'`.appz`'} directory

  ${chalk.dim('Examples:')}

  ${chalk.gray('–')} Log into the Vercel platform

    ${chalk.cyan(`$ ${getPkgName()} login`)}

  ${chalk.gray('–')} Log in using a specific email address

    ${chalk.cyan(`$ ${getPkgName()} login john@doe.com`)}    
`);
};

export default async function login(client: Client): Promise<number> {
  const { output } = client;

  const argv = getArgs(client.argv.slice(2), {
    '--oob': Boolean,
  });

  if (argv['--help']) {
    help();
    return 2;
  }

  if (argv['--token']) {
    output.error('`--token` may not be used with the "login" command');
    return 2;
  }

  const input = argv._[1];

  let result: LoginResult = 1;

  if (input) {
    // Email or Team slug was provided via command line
    validateEmail(input);
    result = await doEmailLogin(client, input);
  } else {
    // Interactive mode
    result = await prompt(client, undefined, argv['--oob']);
  }

  // The login function failed, so it returned an exit code
  if (typeof result === 'number') {
    return result;
  }

  // If the token was upgraded (not a new login), then don't modify
  // the current scope.
  if (!client.authConfig.token) {
    if (result.teamId) {
      // SSO login, so set the current scope to the appropriate Team
      client.config.currentTeam = result.teamId;
    } else {
      delete client.config.currentTeam;
    }
  }

  // Save the user's authentication token to the configuration file.
  client.authConfig.token = result.token;

  writeToAuthConfigFile(client.authConfig);
  writeToConfigFile(client.config);

  output.debug(`Saved credentials in "${hp(getGlobalPathConfig())}"`);

  output.print(
    `${chalk.cyan('Congratulations!')} ` +
      `You are now logged in. In order to deploy something, run ${getCommandName()}.\n`
  );

  return 0;
}
