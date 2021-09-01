# bachelor_kersten_kriegbaum_thesis_appendix
Test files, programs and configs files for my bachelor thesis

# Test data
The test data I have used in my bachelor thesis can be viewed and downloaded here:  
<a href="https://drive.google.com/drive/folders/1V3JcyewofwLccz01Bwu5aGGxDB3zvXir?usp=sharing" target="_blank">https://drive.google.com/drive/folders/1V3JcyewofwLccz01Bwu5aGGxDB3zvXir?usp=sharing</a>

## Levenshtein analysis results
The results of the levenshtein-analysis made with the given tool can be found here:
<a href="https://drive.google.com/drive/folders/1yWXwB2o2bMyOvWEg21F0QZkfxoIHh36x?usp=sharing" target="_blank">https://drive.google.com/drive/folders/1yWXwB2o2bMyOvWEg21F0QZkfxoIHh36x?usp=sharing</a>

### How to read the data from the levenshtein-analysis results CSV files
The columns in the result CSV files represent the following values:  
Datum/Zeit;AnzahlBerechnungen;ZeitSeitBerechnungsstart;ProzentualerFortschritt;AkkumulierteLevenshteinDistanz;AktuelleDurchschnittlicheLevenshteinDistanz
Date/Time ; Number of calculations done so far ; Time since calculation start (ms) ; Progress in % ; Accumulated distance ; actual average levenshtein-distance  


# Deploy Elastic Stack
## Prerequisites
Make sure you have a Kubernetes cluster up and running with helm installed.  
The tiller pod has to be deployed on your cluster.

## Config
The config I used for my test runs can be found here:  
```
./helm-charts-elastic/elasticsearch/values.yaml
./helm-charts-elastic/filebeat/values.yaml
./helm-charts-elastic/kibana/values.yaml
```

## Deployment
Navigate to the project root of the repository directory.  
Then run the deploy script:  
```
./deploy-elastic-stack.sh
```

# Levenshtein-Distance-Tool
The Levenshtein-Distance-Tool analyses a given file and calculates its average levenshtein-distance. You can pass any readable file to it as long as the information in the file is saved line by line and text based. The tool wont analyse every line in the file. It chooses 500 random values, so the minimum number of lines in the file has to be 500.
## Install the tool
Make sure you have cmake 3.16 or newer installed.  


Navigate to ./levenshtein_cplusplus_calculator  
type:  
```
cmake .
make
```

## Use the tool
The program requires 3 parameters.  
1st parameter: The complete path to the file you want to analyse, inclusive the filename.  
example: "/home/kersten/LVD690_1000000/generated-1626115116745.log".  

2nd parameter: Only the file name.  
example: "generated-1626115116745.log".  

3rd parameter: The path you want the results and working log file of the analysis saved to.  
example: "/home/kersten/logs/lvdcalculations/LVD690_1000000".  

example start command:  
```
./levenshtein_cplusplus_calculator /home/kersten/LVD690_1000000/generated-1626115116745.log generated-1626115116745.log /home/kersten/logs/lvdcalculations/LVD690_1000000
```

# Install and use log generator Tool
Make sure you have the latest version of nodejs up and running.  
Switch to ./node_log_generator.  
type:  
```
npm i

node index.js
```
  
To generate random log-messages, you have to send q request to the running node server.  
curl example:  
```
curl -XGET http://localhost:8001\?number\=100000\&lvd\=690
```
The "number" parameter defines the number of log messages you want to generate.  
The "number" parameter accepts any given value between 0 and n.
The "lvd" parameter defines the average levenshtein-distance the generated log file will have.  
  
The "lvd" parameter accepts the following values:  
980  
690  
350  
90  
6  
  
To define the path the generated log file will be saved to, go to line 345 in index.js and edit the destination path.  
The current value is:  
```
"/Users/kersten/logs/generated_"
```

Example for a generated file and it's path:  
```
/Users/kersten/logs/generated-1626099050745.log
```
