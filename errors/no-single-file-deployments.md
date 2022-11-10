# No Single File Deployments

#### Why This Error Occurred

You attempted to create a Youappz deployment where the input is a file, rather than a directory. Previously this was allowed, however this behavior has been removed as of Youappz CLI v24.0.0 because it exposed a potential security risk if the user accidentally created a deployment from a sensitive file.

#### Possible Ways to Fix It

- Run the `appz deploy` command against a directory, instead of a file.
