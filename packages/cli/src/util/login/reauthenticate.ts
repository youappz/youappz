import { bold } from 'chalk';
import showLoginPrompt from './prompt';
import { LoginResult, SAMLError } from './types';
import Client from '../client';

export default async function reauthenticate(
  client: Client,
  error: Pick<SAMLError, 'enforced' | 'scope' | 'teamId'>
): Promise<LoginResult> {
  // Personal account, or team that does not have SAML enforced
  client.output.log(
    `You must re-authenticate to use ${bold(error.scope)} scope.`
  );
  return showLoginPrompt(client, error);
}
