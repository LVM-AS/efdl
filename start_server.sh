#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo
echo "====================================="
echo "EFTA-DL SERVER: Activating virtual environment and starting server"
echo "====================================="
echo

if [[ ! -f venv/bin/activate ]]; then
    echo "ERROR: Virtual environment not found. Run setup-easy.sh first."
    exit 1
fi

source venv/main/bin/activate

echo "Starting server..."
python server.py