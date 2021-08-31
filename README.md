# bachelor_kersten_kriegbaum_thesis_appendix
Test files, programs and configs files for my bachelor thesis

# Deploy Elastic Stack
## Prerequisites
Make sure you have a Kubernetes cluster running and helm installed.  
The tiller pod has to be deployed on your cluster.

## Deployment
Simply run the "deploy-elastic-stack.sh" script.

# Levenshtein-Distance-Tool
The Levenshtein-Distance-Tool analyses a given file and calculates its average levenshtein-distance. You can pass any readable file to it as long as the information in the file is saved line by line and text based. The tool wont analyse every line in the file. It chooses 500 random values, so the minimum number of lines in the file has to be 500.
## Install the tool
XXX

## Use the tool
The program requires 3 parameters.  
1st parameter: The complete path to the file you want to analyse, inclusive the filename.  
example: "/home/kersten/LVD690_1000000/generated-1626115116745.log".  

2nd parameter: Only the file name.  
example: "generated-1626115116745.log".  

3rd parameter: The path you want the results and working log file of the analysis saved to.  
example: "/home/kersten/logs/lvdcalculations/LVD690_1000000".  

example start command:  
```javascript
./levenshtein_cplusplus_calculator /home/kersten/LVD690_1000000/generated-1626115116745.log generated-1626115116745.log /home/kersten/logs/lvdcalculations/LVD690_1000000
```

# Install and use log generator Tool
XXX

# Test data
The test data I have used in my bachelor thesis can be viewed and downloaded here:  
https://drive.google.com/drive/folders/1V3JcyewofwLccz01Bwu5aGGxDB3zvXir?usp=sharing
