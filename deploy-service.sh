#!/bin/bash

OP=$1
VERSION="1.0.0.M1"
SERVICES=("common-service" "azimuth-evaluation-service" "interference-matrix-service" "pci-afp-service" "structure-analysis-service" "gis-service" "web-client" "gis-client")

if [ "$OP" = "dev" -o "$OP" = "test" -o "$OP" = "uat" -o "$OP" = "prod" ]
    then
    for v in ${SERVICES[@]}; do
      SRV="rno-lte-$v"
      chmod +x /root/.m2/repository/com/hgicreate/rno/lte/$SRV/$VERSION/$SRV-$VERSION.jar
      service $SRV stop > /dev/null 2>&1
      rm -f /etc/init.d/$SRV
      rm -f /var/log/$SRV.log
      ln -s /root/.m2/repository/com/hgicreate/rno/lte/$SRV/$VERSION/$SRV-$VERSION.jar /etc/init.d/$SRV
      echo "JAVA_OPTS=\"-Dspring.profiles.active=$OP\"" > /root/.m2/repository/com/hgicreate/rno/lte/$SRV/$VERSION/$SRV-$VERSION.conf
      echo "export LANG=\"zh_CN.UTF-8\"" >> /root/.m2/repository/com/hgicreate/rno/lte/$SRV/$VERSION/$SRV-$VERSION.conf
      echo "export LC_ALL=\"zh_CN.UTF-8\"" >> /root/.m2/repository/com/hgicreate/rno/lte/$SRV/$VERSION/$SRV-$VERSION.conf
      echo "Deployed: $SRV"
    done
    echo "Deploy done."
else
    echo "Usage: ./deploy-service.sh {dev|test|uat|prod}"
fi