#include <string>
#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <cmath>
#include <ctime>
#include <ratio>
#include <chrono>
#include <numeric>
#include <algorithm>
#include <random>

using namespace std;
using namespace std::chrono;

string fileName;

// Compute Levenshtein Distance
// Martin Ettl, 2012-10-05

size_t uiLevenshteinDistance(const string &s1, const string &s2) {
    const size_t
            m(s1.size()),
            n(s2.size());

    if (m == 0) return n;
    if (n == 0) return m;

    // allocation below is not ISO-compliant,
    // it won't work with -pedantic-errors.
    size_t costs[n + 1];

    for (size_t k = 0; k <= n; k++) costs[k] = k;

    size_t i{0};
    for (char const &c1 : s1) {
        costs[0] = i + 1;
        size_t corner{i},
                j{0};
        for (char const &c2 : s2) {
            size_t upper{costs[j + 1]};
            if (c1 == c2) costs[j + 1] = corner;
            else {
                size_t t(upper < corner ? upper : corner);
                costs[j + 1] = (costs[j] < t ? costs[j] : t) + 1;
            }

            corner = upper;
            j++;
        }
        i++;
    }

    return costs[n];
}

vector<string> readLogFile(string _filePath) {
    vector<string> logMessages;
    fstream newfile;

    newfile.open(_filePath, ios::in); //open a file to perform read operation using file object
    if (newfile.is_open()) {   //checking whether the file is open
        string tp;
        while (getline(newfile, tp)) { //read data from file object and put it into string.
            logMessages.push_back(tp);
        }
        newfile.close(); //close the file object.
    }

    return logMessages;
}

string timeAsString() {
    time_t rawtime;
    struct tm *timeinfo;
    char buffer[80];

    time(&rawtime);
    timeinfo = localtime(&rawtime);

    strftime(buffer, sizeof(buffer), "%d-%m-%Y %H:%M", timeinfo);
    std::string str(buffer);

    return str;
}

size_t accumulateDistances(vector<size_t> _distances) {
    size_t startValue = 0;
    size_t accumulatedDistances = std::reduce(_distances.begin(), _distances.end(), startValue);
    return accumulatedDistances;
}

long double calcPercentage(unsigned long _maxCalculations, unsigned long _doneCalculations) {
    auto doneCalculations = (double) _doneCalculations;
    long double percentage = doneCalculations / _maxCalculations * 100;
    return percentage;
}

vector<size_t> calcDistances(vector<string> _logMessages, string _logFilePath, string _logFileName) {

    unsigned long n = _logMessages.size();
    unsigned long estimatedTimeMs = ((n * n - n) / 2 * 97740) / 100000;

    cout << "Number of log messages: " << n << endl;
    cout << "Number of calculations: " << (n * n - n) / 2 << endl;

    high_resolution_clock::time_point t2 = high_resolution_clock::now();
    vector<size_t> distances;
    int arrayLength = _logMessages.size();
    unsigned long counter = 0;

    string path = _logFilePath;
    ofstream outdata; // outdata is like cin
    ofstream outdataCsv; // outdata is like cin


    string logFilePath = path + "/" + _logFileName + "_levenshtein_log_" + timeAsString() + ".txt";
    string logFilePathCsv = path + "/" + _logFileName + "_levenshtein_log_" + timeAsString() + ".csv";

    cout << "logFilePath: " << logFilePath << endl;

    for (unsigned int i = 0; i < arrayLength - 1; i++) {
        for (unsigned int j = i + 1; j < arrayLength; j++) {
            distances.push_back(uiLevenshteinDistance(_logMessages.at(i), _logMessages.at(j)));
            counter++;
            const long n = _logMessages.size();
            if (counter % 500 == 0) {
                high_resolution_clock::time_point t3 = high_resolution_clock::now();
                duration<double, std::milli> time_span = t3 - t2;
                unsigned long accDistances = accumulateDistances(distances);

                // Write to stdout
                cout << endl;
                cout << "Time: " << timeAsString() << endl;
                cout << "Calculated " << counter << " distances in " << time_span.count() << "ms already..." << endl;
                cout << calcPercentage((n * n - n) / 2, counter) << "% of calculations done" << endl;
                cout << "Acc distance: " << accumulateDistances(distances) << endl;
                cout << "Current avg distance: " << accDistances / distances.size() << endl;
                //cout << typeid(accDistances).name() << endl;

                //Write to file txt
                outdata.open(logFilePath, std::ios::app); // opens the file
                if (!outdata) { // file couldn't be opened
                    cerr << "Error: file could not be opened" << endl;
                    exit(1);
                }
                outdata << endl;
                outdata << "Time: " << timeAsString() << endl;
                outdata << "Calculated " << counter << " distances in " << time_span.count() << "ms already..." << endl;
                outdata << calcPercentage((n * n - n) / 2, counter) << "% of calculations done" << endl;
                outdata << "Acc distance: " << accumulateDistances(distances) << endl;
                outdata << "Current avg distance: " << accumulateDistances(distances) / distances.size() << endl;
                outdata.close();

                //Write to file csv
                outdata.open(logFilePathCsv, std::ios::app); // opens the file
                if (!outdata) { // file couldn't be opened
                    cerr << "Error: file could not be opened" << endl;
                    exit(1);
                }

                //datetime, counter, time in ms, percentage, accumulated distance, actual avg distance
                outdata << timeAsString() << ";" << counter << ";" << time_span.count() << ";"
                        << calcPercentage((n * n - n) / 2, counter) << ";" << accumulateDistances(distances) << ";"
                        << accumulateDistances(distances) / distances.size() << endl;
                outdata.close();
            }
        }
    }
    cout << "Calculated distances: " << counter << endl;

    return distances;
}

/**
 * Source: https://www.techiedelight.com/get-slice-sub-vector-from-vector-cpp/
 * @tparam T
 * @param v
 * @param m
 * @param n
 * @return
 */
template<typename T>
std::vector<T> slice(std::vector<T> const &v, int m, int n)
{
    auto first = v.cbegin() + m;
    auto last = v.cbegin() + n + 1;

    std::vector<T> vec(first, last);
    return vec;
}

vector<int> createUniqueValuesVector(int _numberOfValues) {
    vector<int> uniqueValues(_numberOfValues);
    cout << "numberOfValues: " << _numberOfValues << endl;
    for (int i = 0; i < _numberOfValues; i++) {
        //cout << "now in 214" << endl;
        uniqueValues.at(i) = i;
    }

    //cout << "now in 218" << endl;

    for (int j = 0; j < 5; j++) {
        unsigned seed = std::chrono::system_clock::now().time_since_epoch().count();
        std::default_random_engine e(seed);

        std::shuffle(uniqueValues.begin(), uniqueValues.end(), e);
    }

    // starting and ending index
    int m = 0, n = 499;
    //cout << "now in 228" << endl;
    vector<int> sub_vec = slice(uniqueValues, m, n);

    //cout << "sub_vec size: " << sub_vec.size() << endl;

    /**
    for(int k = 0; k < sub_vec.size(); k++) {
        cout << "sub_vec " << k << ": " << sub_vec.at(k) << endl;
    }
    **/

    cout << "sub_vec size: " << sub_vec.size() << endl;
    return sub_vec;
}

vector<string> createSubstitudeVector(vector<int> _randomValues, vector<string> _logMessagesVector) {
    vector<string> substitudeVector(_randomValues.size());

    for(int i = 0; i < _randomValues.size(); i++) {
        substitudeVector.at(i) = _logMessagesVector.at(_randomValues.at(i));
    }

    return substitudeVector;
}

int main(int argc, char* argv[]) {
    cout << "filepath: " << argv[1] << endl;
    cout << "filename: " << argv[2] << endl;
    cout << "saving progress file to path: " << argv[3] << endl;

    string filePath = argv[1];
    fileName = argv[2];

    high_resolution_clock::time_point t1 = high_resolution_clock::now();

    // Read all log-messages from the given file and write them in a vector and return this vector
    vector<string> logMessages = readLogFile(filePath);

    // Generate a vector with 500 random unique values, max value size is size of the logMessages vector
    vector<int> randomValues = createUniqueValuesVector(logMessages.size());

    // Create the substitudes vector with 500 random log-messages from the original logMessages vector
    vector<string> substitudesVector = createSubstitudeVector(randomValues, logMessages);

    // Calculate average Levenshtein-Distance between all log-messages in the substitude vector
    vector<size_t> distances = calcDistances(substitudesVector, argv[3], argv[2]);

    long double averageDistance = accumulateDistances(distances) / distances.size();

    cout << "Sum of distances " << accumulateDistances(distances) << endl;
    cout << "Average distance " << averageDistance << endl;

    high_resolution_clock::time_point t4 = high_resolution_clock::now();
    duration<double, std::milli> time_span = t4 - t1;
    cout << "Program finished in " << time_span.count() << "ms" << endl;
    return 0;
}
