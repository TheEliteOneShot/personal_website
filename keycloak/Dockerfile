FROM jboss/keycloak:16.1.1

USER jboss

RUN sed -i -e 's/<web-context>auth<\/web-context>/<web-context>iam\/auth<\/web-context>/' $JBOSS_HOME/standalone/configuration/standalone.xml
RUN sed -i -e 's/<web-context>auth<\/web-context>/<web-context>iam\/auth<\/web-context>/' $JBOSS_HOME/standalone/configuration/standalone-ha.xml
RUN sed -i -e 's/name="\/"/name="\/iam\/"/' $JBOSS_HOME/standalone/configuration/standalone.xml
RUN sed -i -e 's/name="\/"/name="\/iam\/"/' $JBOSS_HOME/standalone/configuration/standalone-ha.xml
RUN sed -i -e 's/\/auth/\/iam\/auth/' $JBOSS_HOME/welcome-content/index.html
RUN sed -i -e 's/<web-context>auth<\/web-context>/<web-context>iam\/auth<\/web-context>/' $JBOSS_HOME/domain/configuration/domain.xml

EXPOSE 8080