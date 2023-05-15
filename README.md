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

```
python3 -m venv nepcorte
source acesso-facil/bin/activate
pip3 install django
pip3 install mysqlclient
django-admin startproject nepcorte
cd nepcorte
python3 manage.py startapp api
python3 manage.py runserver
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