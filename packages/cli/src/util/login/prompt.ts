import Client from '../client';
import error from '../output/error';
import { getCommandName } from '../pkg-name';
import { LoginResult, SAMLError } from './types';
import doEmailLogin from './email';

export default async function prompt(
  client: Client,
  error?: Pick<SAMLError, 'teamId'>,
  outOfBand?: boolean,
  ssoUserId?: string
) {
  let result: LoginResult = 1;

  const email = await readInput(client, 'Enter your email address:');
  result = await doEmailLogin(client, email);

  return result;
}

export async function readInput(
  client: Client,
  message: string
): Promise<string> {
  let input;

  while (!input) {
    try {
      const { val } = await client.prompt({
        type: 'input',
        name: 'val',
        message,
      });
      input = val;
    } catch (err: any) {
      console.log(); // \n

      if (err.isTtyError) {
        throw new Error(
          error(
            `Interactive mode not supported – please run ${getCommandName(
              `login you@domain.com`
            )}`
          )
        );
      }
    }
  }

  return input;
}
