# Mongo Database Access and You

## Contents

## Databases

There are two databases, hosted using mongo Atlas: ```test``` and ```prod```.

As the names suggest, ```test``` will be used for testing and development, and ```prod``` will __ONLY__ be used for production instances of the app.

Please clear any and all manual updates to prod with your fellow maintainers beforehand. 

## Access the DB

You will need an updated mongo client to access the databases.

On MacOS (which I believe all maintainers are using), run the following command:

```
brew install mongodb
```

If you get the following error

```
Error: mongodb 3.6.3 is already installed
```

Simply upgrade mongo

```
brew upgrade mongodb
```

If you're running a different OS and need help, please contact ssg413@nyu.edu

### Prod

Connect to the production instance by simply running the following command and entering the admin password.

```
mongo "mongodb://cluster0-shard-00-00-r8bsd.mongodb.net:27017,cluster0-shard-00-01-r8bsd.mongodb.net:27017,cluster0-shard-00-02-r8bsd.mongodb.net:27017/test?replicaSet=Cluster0-shard-0" --ssl --authenticationDatabase admin --username nyu_agile_admin --password
```

The application will connect with one of the following connection strings:

```
mongodb://nyu_agile_admin:<PASSWORD>@cluster0-shard-00-00-r8bsd.mongodb.net:27017,cluster0-shard-00-01-r8bsd.mongodb.net:27017,cluster0-shard-00-02-r8bsd.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true

mongodb://nyu_agile_trading:<PASSWORD>@cluster0-shard-00-00-r8bsd.mongodb.net:27017,cluster0-shard-00-01-r8bsd.mongodb.net:27017,cluster0-shard-00-02-r8bsd.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true
```

### Test

Connect to the test instance by simply running the following command and entering the admin password.

```
mongo "mongodb://cluster0-shard-00-00-l3dcg.mongodb.net:27017,cluster0-shard-00-01-l3dcg.mongodb.net:27017,cluster0-shard-00-02-l3dcg.mongodb.net:27017/test?replicaSet=Cluster0-shard-0" --ssl --authenticationDatabase admin --username nyu_agile_test_admin --password 
```

The application will connect with the following connection string:

```
mongodb://nyu_agile_test_admin:<PASSWORD>@cluster0-shard-00-00-l3dcg.mongodb.net:27017,cluster0-shard-00-01-l3dcg.mongodb.net:27017,cluster0-shard-00-02-l3dcg.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true
```

## Getting Credentials

Please email ```ssg413@nyu.edu``` for access

Core maintainers should already have received information for how to access the databases