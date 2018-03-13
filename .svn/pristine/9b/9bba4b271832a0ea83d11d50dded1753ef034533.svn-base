#!/bin/bash

OP=$1
SERVICES=("common-service" "azimuth-evaluation-service" "interference-matrix-service" "pci-afp-service" "structure-analysis-service" "gis-service" "web-client" "gis-client")

if [ "$OP" = "start" -o "$OP" = "restart" -o "$OP" = "stop" -o "$OP" = "reload" -o "$OP" = "status" ]
then
  ITEM=$2
  RE='^[0-9]+$'
  if [ "$ITEM" = "all" ]; then
    for v in ${SERVICES[@]}; do
      service rno-lte-$v $OP
    done
    exit 0
  elif [[ "$ITEM" =~ $RE ]]; then
    if [ "$ITEM" -gt 0 -a "$ITEM" -le ${#SERVICES[@]} ]; then
      let ITEM=$ITEM-1
      service rno-lte-${SERVICES[$ITEM]} $OP
      exit 0
    fi
  fi
fi
echo "Usage: ./run-service.sh {start|restart|stop|reload|status} {all|1-${#SERVICES[@]}}"
echo "Service:"
IDX=1
for v in ${SERVICES[@]}; do
  echo "$IDX rno-lte-$v"
  let IDX=$IDX+1
done
