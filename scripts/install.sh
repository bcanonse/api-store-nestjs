#!/bin/bash

echo "--------------------------------------------------------------------------\n"
echo "-------------------------Install Updates OS--------------------------------\n"
echo "--------------------------------------------------------------------------\n"

apt-get update -qq -y \
&& apt-get upgrade -y \
&& apt-get dist-upgrade -y \
&& apt-get autoremove -y

echo "--------------------------------------------------------------------------\n"



echo "--------------------------------------------------------------------------\n"
echo "-------------------------Install Utilities--------------------------------\n"

apt-get install -y unzip wget
apt-get install net-tools -y
apt-get install curl

echo "--------------------------------------------------------------------------\n"



echo "--------------------------------------------------------------------------\n"
echo "-------------------------Install NodeJS Current--------------------------------\n"


apt-get install nodejs -y


curl o https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

source ~/.bashrc

nvm install 20.16.0

echo "--------------------------------------------------------------------------\n"


echo "--------------------------------------------------------------------------\n"
echo "-------------------------Install Docker Engine--------------------------------\n"

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update -qq
apt-get upgrade -y
apt-get dist-upgrade -y
apt-get autoremove -y


apt-get install -y \
    docker-ce \
    docker-compose \

groupadd docker
usermod -aG docker ubuntu

echo "--------------------------------------------------------------------------\n"



echo "--------------------------------------------------------------------------\n"
echo "-------------------------Install Pm2--------------------------------\n"
npm install -g pm2@latest

echo "--------------------------------------------------------------------------\n"



echo "--------------------------------------------------------------------------\n"
echo "-------------------------Install Ngnix--------------------------------\n"

apt install nginx

systemctl status nginx

echo "--------------------------------------------------------------------------\n"

echo "--------------------------------------------------------------------------\n"
echo "-------------------------Conf Ngnix server proxy--------------------------------\n"

ln -s /etc/nginx/sites-available/your-domain.com.conf /etc/nginx/sites-enabled/your-domain.com.conf

systemctl restart nginx

nginx -t

echo "--------------------------------------------------------------------------\n"

echo "--------------------------------------------------------------------------\n"
echo "-------------------------Install Certbot--------------------------------\n"
apt install certbot python3-certbot-nginx

certbot --version

certbot --nginx

certbot renew --dry-run

echo "--------------------------------------------------------------------------\n"
