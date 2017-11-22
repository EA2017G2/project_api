#!/bin/bash

ssh ea0@147.83.7.157 "cd /home/ea0/PROJECTS;rm -rf project_api-wip;git clone https://github.com/EA2017G2/project_api.git project_api-wip;cd project_api-wip;git checkout $1"