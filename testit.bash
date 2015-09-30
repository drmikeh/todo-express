#!/bin/bash

http localhost:3000

http localhost:3000/todos
http localhost:3000/todos/new
http localhost:3000/todos/2
http localhost:3000/todos/2/edit
http -f POST localhost:3000/todos
http PUT localhost:3000/todos/2
http DELETE localhost:3000/todos/2
