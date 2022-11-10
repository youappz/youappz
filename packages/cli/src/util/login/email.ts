import highlight from '../output/highlight';
import eraseLines from '../output/erase-lines';
import verify from './verify';
import executeLogin from './login';
import { readInput } from './prompt';
import Client from '../client';
import { LoginResult } from './types';
import { isAPIError } from '../errors-ts';
import { errorToString } from '../is-error';

export default async function doEmailLogin(
  client: Client,
  email: string
): Promise<LoginResult> {
  let securityCode;
  const { output } = client;

  output.spinner('Sending you an email');

  try {
    await executeLogin(client, email);
  } catch (err: unknown) {
    output.error(errorToString(err));
    return 1;
  }

  // Clear up `Sending email` success message
  output.print(eraseLines(1));

  output.print(
    `We sent an email to ${highlight(
      email
    )}. Please follow the steps provided inside it and make sure the security code matches .\n`
  );

  let result: LoginResult = 1;
  try {
    securityCode = await readInput(client, 'Verification code:');
    output.spinner('Verifying the Security Code');
    result = await verify(client, securityCode, email, 'Email');
  } catch (err: unknown) {
    if (!isAPIError(err) || err.serverMessage !== 'Confirmation incomplete') {
      output.error(errorToString(err));
      return 1;
    }
  }

  output.success(`Email authentication complete for ${email}`);
  console.log(result);
  return result;
}
