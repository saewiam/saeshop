.PHONY: all build start stop restart clean cleanstart

all: clean build start
build:
	docker compose \
		--env-file postgres/development.env \
		--env-file payload/development.env \
		build
start:
	docker compose \
		--env-file postgres/development.env \
		--env-file payload/development.env \
		up --watch
stop: 
	docker compose \
		--env-file postgres/development.env \
		--env-file payload/development.env \
		down --remove-orphans
restart: stop start
cleanstart: clean start
clean:
	docker compose \
		--env-file postgres/development.env \
		--env-file payload/development.env \
		down -v --remove-orphans
