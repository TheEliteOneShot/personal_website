FROM python:3.8.12-slim
RUN pip install pipenv

WORKDIR /api/
COPY ./api /api/
RUN pipenv install

EXPOSE 5000

ENTRYPOINT ["pipenv", "run", "uvicorn", "main:app", "--port", "5000", "--host", "0.0.0.0","--log-level", "error"]