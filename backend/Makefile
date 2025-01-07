DOCKER_COMPOSE = docker-compose
ENV_FILE = .env
SERVICE = app
DOCKER_BUILD_ARGS = --env-file $(ENV_FILE)
DOCKER_RUN_ARGS = --build --force-recreate
DOCKER_DOWN_ARGS = down

.PHONY: build up down restart logs clean bash db-migrate db-seed

# Build the Docker image (no need for --tag, it's set in the docker-compose.yml)
build:
	$(DOCKER_COMPOSE) $(DOCKER_BUILD_ARGS) build

# Run the Docker container using the 'latest' tag
up:
	$(DOCKER_COMPOSE) up 

# Bring down the container and remove the image tagged with 'latest'
down:
	$(DOCKER_COMPOSE) $(DOCKER_DOWN_ARGS) --rmi local --volumes

restart: down up

logs:
	$(DOCKER_COMPOSE) logs -f $(SERVICE)

clean:
	$(DOCKER_COMPOSE) $(DOCKER_DOWN_ARGS) --volumes --remove-orphans

bash:
	$(DOCKER_COMPOSE) exec $(SERVICE) sh

db-migrate:
	$(DOCKER_COMPOSE) exec $(SERVICE) yarn run migrate

db-seed:
	$(DOCKER_COMPOSE) exec $(SERVICE) yarn run seed
