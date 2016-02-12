# Deployment instructions

In order to deploy your application in integration or production, you need to prepare a few things:

- Run a remote server instance
- Create a S3 bucket
- Have a working database

RDS or whatever you need, apart migrations, we do not manage the database with deployment script.


## API

### First deployment

The makefile offers you some functions to easily start an ubuntu server with all needed dependencies.

Be sure to have the same `hosts` in your `.fabricrc` or `.fabricrc-staging` than in you `.ssh/config`.
Example :
```bash
Host newapp-api.marmelab.com
    Hostname 127.0.0.1  # IP address or domain name
    IdentityFile ~/.ssh/keys/super_secure_key.pem
    User ubuntu
```

In general, take a look at your `.fabricrc` and be sure to understand the behavior of all configurations by reading the `fabfile.py`.

Then, simply run:
```bash
make setup-staging
# or
make setup-prod
```

It updates system and installs all dependencies like: `Node.js`, `git`, `supervisor`...

At the end of the installation, you will see the version of what you have installed on the server.

### Deployment

Run the following command:
```bash
make deploy-staging-api
# or
make deploy-prod-api
```

It:
- Pulls the specified branch
- Installs node dependencies (from your `package.json`)
- Updates supervisor configuration file (from `config/supervisor`)
- Restarts your app


## Frontend

The frontend deployment consists in two steps:
- Builind locally your(s) application(s)
- Sending your builds to a S3 bucket

To do that, you need to install the [AWS client](https://aws.amazon.com/cli/) on your workstation.
```bash
make install-aws
```

At the end, it will run `aws configure` to help you to configuring the client. But you can skip this part if you want.

The deployment itself:
```bash
# Staging deployment
make deploy-staging-frontend
# Prod deployment
make deploy-prod-frontend
# Manual specification of AWS credentials if you have not configured aws-cli
AWS_ACCESS_KEY_ID=XXXXXXXXXXXXX AWS_SECRET_ACCESS_KEY=YYYYYYYYYYYYY make deploy-prod-frontend
```

All these commands:
- :warning: Checkout on master branch (be sure to stash non-commited work)
- Make a local production or staging build
- Synchronize `build` folder with configured S3 bucket
