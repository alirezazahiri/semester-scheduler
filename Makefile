MODE ?= DEVELOPMENT
DOCKER_COMPOSE_FILE := $(if $(filter PRODUCTION,$(MODE)),docker-compose.yml,docker-compose.dev.yml)
DOCKER_COMPOSE = docker compose

.PHONY: help build up down run

help:
	@echo "Usage:"
	@echo ""
	@echo "Targets:"
	@echo "  help                Display this help message"
	@echo "  build               Build the Next.js application with Docker Compose"
	@echo "  up                  Start Docker Compose services"
	@echo "  down                Stop and remove Docker Compose services"
	@echo "  run                 Run the application using Docker Compose based on MODE"

build:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) build

up:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up

down:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down --remove-orphans

run:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up
