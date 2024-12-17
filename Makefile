DOCKER_COMPOSE = docker-compose
ENV_FILE = .env
SERVICE = app
DOCKER_BUILD_ARGS = --env-file $(ENV_FILE)
DOCKER_RUN_ARGS = up --build
DOCKER_DOWN_ARGS = down

.PHONY: build up down restart logs clean bash db-migrate db-seed

build:
	$(DOCKER_COMPOSE) $(DOCKER_BUILD_ARGS) build

up:
	$(DOCKER_COMPOSE) $(DOCKER_BUILD_ARGS) $(DOCKER_RUN_ARGS)

down:
	$(DOCKER_COMPOSE) $(DOCKER_DOWN_ARGS)

restart: down up

logs:
	$(DOCKER_COMPOSE) logs -f $(SERVICE)

clean:
	$(DOCKER_COMPOSE) $(DOCKER_DOWN_ARGS) --volumes

bash:
	$(DOCKER_COMPOSE) exec $(SERVICE) sh

db-migrate:
	$(DOCKER_COMPOSE) exec $(SERVICE) yarn run migrate

db-seed:
	$(DOCKER_COMPOSE) exec $(SERVICE) yarn run seed
