#!/bin/bash


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


echo "|||||||||||||||||||||||||||||||||||||||||||||||||||||"
echo "|||||||||||||||||||||||||||||||||||||||||||||||||||||"
echo "||||||||||||||||| STARTING INSTALL ||||||||||||||||||"
echo "||||||||||||||||| STARTING INSTALL ||||||||||||||||||"
echo "||||||||||||||||| STARTING INSTALL ||||||||||||||||||"
echo "|||||||||||||||||||||||||||||||||||||||||||||||||||||"
echo "|||||||||||||||||||||||||||||||||||||||||||||||||||||"


echo "- - - - - - - - - - - ||||||||| - - - - - - - - - - -"
echo "backing up current requirements to bak-requirements.txt"
cd /workspace
pip freeze > bak-requirements.txt
echo "- - - - - - - - - - --  DONE -- - - - - - - - - - - -"


echo "- - - - - - - - - - - ||||||||| - - - - - - - - - - -"
echo "installing/updating basic tooling and huggingface hub"
pip install -U pip
pip install huggingface-hub #hf_transfer
pip install hf_xet
pip install -U huggingface-hub #hf_transfer
pip install -U hf_xet
echo "- - - - - - - - - - --  DONE -- - - - - - - - - - - -"


echo "- - - - - - - - - - - ||||||||| - - - - - - - - - - -"
echo "logging in to huggingface hub"
hf auth login --token "$HF_TOKEN"
echo "- - - - - - - - - - --  DONE -- - - - - - - - - - - -"


echo "- - - - - - - - - - - ||||||||| - - - - - - - - - - -"
echo "cleaning up pip cache to save space"
pip cache purge
pip3 cache purge
echo "- - - - - - - - - - --  DONE -- - - - - - - - - - - -"

cd /workspace
git clone https://github.com/LVM-AS/efdl

cd /workspace/efdl
chmod +x *.sh

./setup-easy.sh