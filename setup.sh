#Run this file on an Ubuntu machine with port 80 open
sudo apt update
sudo apt upgrade -y
sudo apt install build-essential git apache2 -y
sudo apt-get install libboost-all-dev -y
sudo apt install cmake -y

#installs dlib, a dependency for face_recognition
git clone https://github.com/davisking/dlib.git
cd dlib
mkdir build; cd build; cmake .. -DDLIB_USE_CUDA=0 -DUSE_AVX_INSTRUCTIONS=1; cmake --build .
cd ..
python3 setup.py install --yes USE_AVX_INSTRUCTIONS --no DLIB_USE_CUDA


sudo apt install python3-pip -y


pip3 install face_recognition
cd ..
git clone https://github.com/ageitgey/face_recognition.git
