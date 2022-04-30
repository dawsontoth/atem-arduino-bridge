# ATEM Arduino Bridge

## Pub-Sub

### request-atem-state()

### atem-state(error: 'm' + string or csv of 0 prev,0 prog,1 prev,1 prog)

### request-atem-labels()

### atem-labels(error: 'm' + string or csv of short labels)

### change-program-input(csv: input #, m/e #)

### cut(csv: m/e #)

### fade(csv: m/e #)

### run-macro(csv: index #)

## Docker

On dev machine:
https://www.docker.com/blog/how-to-deploy-on-remote-docker-hosts-with-docker-compose/
```
docker context create remote --docker "host=ssh://trinity@holygoose.local"
```

On pi:
https://dev.to/elalemanyo/how-to-install-docker-and-docker-compose-on-raspberry-pi-1mo
```
curl -sSL https://get.docker.com | sh
sudo usermod -aG docker ${USER}

sudo apt-get install libffi-dev libssl-dev
sudo apt install python3-dev
sudo apt-get install -y python3 python3-pip
sudo pip3 install docker-compose

sudo systemctl enable docker
```
