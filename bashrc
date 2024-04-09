alias dcu='docker-compose up -d'
alias dcd='docker-compose down'
alias ddc='docker rm -f $(docker ps -aq)'
alias ddi='docker rmi -f $(docker images -aq)'
