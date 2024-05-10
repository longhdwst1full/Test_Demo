# Node-js-Auth


 1 Create db pg from docker: 

      docker run --name pg-container-name -p 8888:5432 -e POSTGRES_USER=mkyong -e POSTGRES_PASSWORD=password -e POSTGRES_DB=mydb -d postgres


2 Access db pg

    docker exec -it pg-container-name psql -U mkyong -d mydb


===============


*PostgreSQL Container and Volume

1 Create a volume named postgres-volumn.
 
    docker volume create postgres-volumn

2 We can use -v to mount a volume to a directory inside the container.

    docker run -v postgres-volumn:/path/in/container my-image  

3 The below command mount the Docker volume postgres-volumn to the PostgreSQL data directory /var/lib/postgresql/data.

    docker run --name pg-container-name -e POSTGRES_USER=mkyong -e POSTGRES_PASSWORD=password -e POSTGRES_DB=mydb -v 

===========

Access the PostgreSQL container log

    docker logs pg-container-name


Stop the PostgreSQL Container

      docker stop pg-container-name
