#!/usr/bin/env bash

set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PORT="${PORT:-3000}"
NPM_CACHE_DIR="$APP_DIR/.npm-cache"
NPM_REGISTRY="${NPM_REGISTRY:-https://registry.npmmirror.com}"

cd "$APP_DIR"

print_usage() {
  echo "Usage: ./run.sh {install|start|stop|restart|status}"
}

pid_from_port() {
  if command -v lsof >/dev/null 2>&1; then
    lsof -ti tcp:"$PORT" 2>/dev/null | head -n 1
  fi
}

current_pid() {
  pid_from_port || true
}

ensure_dependencies() {
  if [[ ! -d "$APP_DIR/node_modules" ]]; then
    echo "node_modules not found."
    echo "Please install dependencies first:"
    echo "  npm install --cache \"$NPM_CACHE_DIR\""
    exit 1
  fi
}

install_dependencies() {
  echo "Installing dependencies with project-local npm cache..."
  echo "Cache: $NPM_CACHE_DIR"
  echo "Registry: $NPM_REGISTRY"
  npm install \
    --cache "$NPM_CACHE_DIR" \
    --registry "$NPM_REGISTRY" \
    --prefer-offline \
    --loglevel=notice
}

start_app() {
  local pid
  pid="$(current_pid)"

  if [[ -n "$pid" ]]; then
    echo "App is already running on port $PORT, PID: $pid"
    exit 0
  fi

  ensure_dependencies

  echo "Starting Next.js on http://localhost:$PORT"
  echo "Output will stay attached to this terminal. Press Ctrl+C to stop."
  PORT="$PORT" npm run dev
}

stop_app() {
  local pid
  pid="$(current_pid)"

  if [[ -z "$pid" ]]; then
    echo "App is not running."
    return 0
  fi

  echo "Stopping app, PID: $pid"
  kill "$pid" 2>/dev/null || true

  for _ in {1..20}; do
    if ! kill -0 "$pid" 2>/dev/null; then
      echo "Stopped."
      return 0
    fi
    sleep 0.2
  done

  echo "Process did not stop gracefully. Forcing shutdown..."
  kill -9 "$pid" 2>/dev/null || true
  echo "Stopped."
}

status_app() {
  local pid
  pid="$(current_pid)"

  if [[ -n "$pid" ]]; then
    echo "App is running on http://localhost:$PORT, PID: $pid"
  else
    echo "App is not running."
  fi
}

case "${1:-}" in
  install)
    install_dependencies
    ;;
  start)
    start_app
    ;;
  stop)
    stop_app
    ;;
  restart)
    stop_app
    start_app
    ;;
  status)
    status_app
    ;;
  *)
    print_usage
    exit 1
    ;;
esac
