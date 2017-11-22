#!/bin/bash

ssh ea0@147.83.7.157 "cd /home/ea0/PROJECTS;rm -rf project_api;git clone https://github.com/EA2017G2/project_api.git project_api;cd project_api;echo PORT=3000 > .env;echo MONGODB='mongodb://mongo:27017/project_api' >> .env;echo SECRET_TOKEN='G2loveshottt' >> .env"