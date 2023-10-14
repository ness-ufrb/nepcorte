# NEPCORTE

## Repository structure

The repository has the following folder structure:

* **code**: it contains all system's source code.

* **docs**: folder containing all relevant files for the team members regarding business rules, installation, configurarion and execution of the system into a local environment.

## Configuration management in this project

All developers have to follow the Git usage instructions. They ensure the source code consistency between production, staging and local environments.

The standard Git repository branches are:

* **main**: branch containing the production source code

* **staging**: branch containing the source code for the staging environment, which is used to perform beta testing

* **develop**: branch to accommodate the working source code. Developers have to use the develop branch to create their own working branches and to merge back their tested source code.

* **baseline/<sprint_number>**: branchs to accommodate the working source code for a specific sprint delivery.

* **<developer_username>/<feature_name>**: branchs to accommodate the developer's isolated work.

## Mobile app

### Run project

```
cd code/app-nepcorte
yarn
expo start
```

### Build for testing

```
cd code/app-nepcorte
eas build -p android --profile preview
```

### Build for production

```
cd code/app-nepcorte
eas build -p android
```

## API

### Installation and configuration

* Python version: 3.9

* venv creation

```
cd positivo-preditor/back-end
python3.9 -m venv venv
source venv/bin/activate
pip install -r ./requirements.txt
```

* Project config file

```
cd positivo-preditor/back-end
cp example.cnf default.cnf
```

Modify the content in default.cnf according to your local MySQL database

### Migrations

#### Create migration file

```
python manage.py makemigrations
```

#### Migrate database

```
python manage.py migrate
```

### Dependencies

#### Save dependencies

```
pip freeze > requirements.txt
```

### Run

#### Run project

```
source venv/bin/activate
python manage.py runserver 0.0.0.0:7777
```

#### Create superuser

```
python manage.py createsuperuser
```

#### Test user

```
nepcorte@ness.dev.br | 6gY+XtU5jH8eG&ZERpstUQG8q^6XmDsB
```

### Database

Locan environment configuration:

```
Schema: nepcorte
Usuário: nepcorte
Senha: nepcorte
```

Django admin database migration and checking:

```
python3 manage.py migrate
python3 manage.py check

```