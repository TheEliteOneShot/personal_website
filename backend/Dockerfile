FROM python:3.8.12-slim
RUN pip install pipenv

WORKDIR /api/
COPY ./api /api/
RUN pipenv install

EXPOSE 5000

