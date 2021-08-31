helm install ./helm-charts-elastic/elasticsearch --name elasticsearch -f ./values.yaml
sleep 20

helm install ./helm-charts-elastic/filebeat --name filebeat -f ./values.yaml
sleep 20

helm install ./helm-charts-elastic/kibana --name kibana -f ./values.yaml
