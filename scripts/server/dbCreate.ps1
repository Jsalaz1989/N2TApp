"Creating database"

cd ../server

C:\PostgreSQL\pg11\bin\createuser -d -s --interactive -h localhost -p 5432 -U postgres Jaime
C:\PostgreSQL\pg11\bin\createdb -O Jaime -h localhost -p 5432 -U Jaime autom8

flask db init