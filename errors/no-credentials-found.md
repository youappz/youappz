# No Credentials Found

#### Why This Error Occurred

You're running Youappz CLI in a non-terminal context and there are no credentials available. This means that Youappz CLI is not able to authenticate against our service.

#### Possible Ways to Fix It

- Specify a value for the `--token` flag (this needs to be the token of the user account as which you'd like to act). You can create a new token on your [Settings page](https://youappz.com/account/tokens).
- Run `appz login` to sign in and generate a new token
