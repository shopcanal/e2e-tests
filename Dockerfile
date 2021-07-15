FROM mcr.microsoft.com/playwright:focal
COPY action.sh /action.sh
COPY package.json /package.json
COPY tests /tests
ENTRYPOINT ["/action.sh"]