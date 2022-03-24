FROM mcr.microsoft.com/playwright:v1.20.0-focal
COPY *.ts ./
COPY action.sh /action.sh
COPY package.json /package.json
COPY tests /tests
COPY helpers /helpers
ENTRYPOINT ["/action.sh"]