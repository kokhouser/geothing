#!/bin/bash

mongo geothingtest --eval "db.dropDatabase()"
mongo geothingtest --eval 'db.users.insert(
							{username: "TestMaster",
							password: "testpass",
							email:"test@test.com"})'