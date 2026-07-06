#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo
echo "====================================="
echo "EFTA-DL setup: creating virtual environment and installing dependencies"
echo "====================================="
echo

if ! command -v python3 >/dev/null 2>&1; then
    echo "ERROR: Python 3 is not available. Install Python and make sure it is on your PATH."
    exit 1
fi

if [[ -d /venv ]]; then
    echo "Using existing virtual environment in /venv/"
    ln -s /venv/ venv/
else
    echo "Creating virtual environment..."
    python3 -m venv /venv
    ln -s /venv/ venv/
fi

echo "Activating virtual environment..."
source venv/main/bin/activate

echo "Upgrading pip..."
python -m pip install --upgrade pip

echo "Installing dependencies from requirements.txt..."
python -m pip install -r requirements.txt

echo "Installing Playwright browsers..."
python -m playwright install

echo "Installing Playwright system dependencies..."
python -m playwright install-deps

echo
echo "Setup complete. You can now run the project using the activated virtual environment."